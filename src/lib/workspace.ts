import { Lead, BookingSlot } from '../types';

export async function createOrGetLeadsSpreadsheet(accessToken: string): Promise<string> {
  try {
    const searchRes = await fetch(
      "https://www.googleapis.com/drive/v3/files?q=name%3D'CodeNexAnkit%20Leads%20%26%20Consultations'+and+mimeType%3D'application/vnd.google-apps.spreadsheet'+and+trashed%3Dfalse",
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.files && searchData.files.length > 0) {
        return searchData.files[0].id;
      }
    }
  } catch (err) {
    console.warn('Drive search warning:', err);
  }

  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        title: 'CodeNexAnkit Leads & Consultations'
      },
      sheets: [
        {
          properties: { title: 'Leads' },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'Date' } },
                    { userEnteredValue: { stringValue: 'Name' } },
                    { userEnteredValue: { stringValue: 'Email' } },
                    { userEnteredValue: { stringValue: 'Phone' } },
                    { userEnteredValue: { stringValue: 'Company' } },
                    { userEnteredValue: { stringValue: 'Service Needed' } },
                    { userEnteredValue: { stringValue: 'Budget' } },
                    { userEnteredValue: { stringValue: 'Message' } },
                    { userEnteredValue: { stringValue: 'Status' } }
                  ]
                }
              ]
            }
          ]
        }
      ]
    })
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    throw new Error(`Failed to create Google Sheet: ${errorText}`);
  }

  const sheetData = await createRes.json();
  return sheetData.spreadsheetId;
}

export async function exportLeadsToSheet(
  accessToken: string,
  spreadsheetId: string,
  leads: Partial<Lead>[]
): Promise<number> {
  const rows = leads.map((lead) => [
    lead.createdAt || new Date().toISOString().split('T')[0],
    lead.name || '',
    lead.email || '',
    lead.phone || '',
    lead.company || '',
    lead.serviceNeeded || '',
    lead.budget || '',
    lead.message || '',
    lead.status || 'New'
  ]);

  const appendRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Leads!A1:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: rows
      })
    }
  );

  if (!appendRes.ok) {
    const errText = await appendRes.text();
    throw new Error(`Failed to append data to Google Sheet: ${errText}`);
  }

  const result = await appendRes.json();
  return result.updates?.updatedRows || rows.length;
}

export async function getSheetsData(accessToken: string, spreadsheetId: string) {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Leads!A1:Z100`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );
  if (!res.ok) {
    throw new Error('Failed to read data from Google Sheet');
  }
  return await res.json();
}

export async function sendGmailMessage(
  accessToken: string,
  recipientEmail: string,
  subject: string,
  bodyText: string
): Promise<{ id: string }> {
  const rawEmail = [
    `To: ${recipientEmail}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${subject}`,
    '',
    bodyText
  ].join('\r\n');

  const encodedEmail = btoa(unescape(encodeURIComponent(rawEmail)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      raw: encodedEmail
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gmail API error: ${errText}`);
  }

  return await res.json();
}

export async function listGmailDrafts(accessToken: string) {
  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/drafts', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!res.ok) {
    throw new Error('Failed to list Gmail drafts');
  }
  return await res.json();
}

export async function listGoogleChatSpaces(accessToken: string) {
  const res = await fetch('https://chat.googleapis.com/v1/spaces', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!res.ok) {
    const err = await res.text();
    console.warn('Google Chat spaces fetch issue:', err);
    return { spaces: [] };
  }
  return await res.json();
}

export async function sendGoogleChatMessage(
  accessToken: string,
  spaceName: string,
  messageText: string
) {
  const cleanSpace = spaceName.startsWith('spaces/') ? spaceName : `spaces/${spaceName}`;
  const res = await fetch(`https://chat.googleapis.com/v1/${cleanSpace}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: messageText
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Chat API error: ${errText}`);
  }

  return await res.json();
}

export async function getFormMetadata(accessToken: string, formId: string) {
  const res = await fetch(`https://forms.googleapis.com/v1/forms/${formId}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch Google Form: ${err}`);
  }
  return await res.json();
}

export async function getFormResponses(accessToken: string, formId: string) {
  const res = await fetch(`https://forms.googleapis.com/v1/forms/${formId}/responses`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch Google Form responses: ${err}`);
  }
  return await res.json();
}
