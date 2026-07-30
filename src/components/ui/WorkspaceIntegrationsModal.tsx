import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  Mail, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ExternalLink, 
  Send, 
  RefreshCw, 
  LogOut,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { User } from 'firebase/auth';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, googleSignIn, logout, initAuth } from '../../lib/firebase';
import { 
  createOrGetLeadsSpreadsheet, 
  exportLeadsToSheet, 
  sendGmailMessage, 
  listGoogleChatSpaces, 
  sendGoogleChatMessage, 
  getFormResponses 
} from '../../lib/workspace';
import { Lead } from '../../types';

interface WorkspaceIntegrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkspaceIntegrationsModal: React.FC<WorkspaceIntegrationsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [activeTab, setActiveTab] = useState<'sheets' | 'gmail' | 'chat' | 'forms'>('sheets');

  const [sheetId, setSheetId] = useState<string | null>(null);
  const [isExportingSheets, setIsExportingSheets] = useState(false);
  const [sheetsExportSuccess, setSheetsExportSuccess] = useState<string | null>(null);

  const [gmailRecipient, setGmailRecipient] = useState('client@example.com');
  const [gmailSubject, setGmailSubject] = useState('CodeNexAnkit Software Discovery Proposal');
  const [gmailBody, setGmailBody] = useState('Hi there,\n\nThank you for reaching out to CodeNexAnkit. We have reviewed your project requirements and would love to schedule a technical architecture discussion.\n\nBest regards,\nCodeNexAnkit Principal Architect');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  const [chatSpaces, setChatSpaces] = useState<{ name: string; displayName?: string }[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<string>('');
  const [chatMessage, setChatMessage] = useState('🚀 New High-Priority Lead Qualified on CodeNexAnkit Hub!');
  const [isPostingChat, setIsPostingChat] = useState(false);
  const [chatStatus, setChatStatus] = useState<string | null>(null);

  const [formIdInput, setFormIdInput] = useState('');
  const [formResponses, setFormResponses] = useState<any[]>([]);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [formStatus, setFormStatus] = useState<string | null>(null);

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    actionLabel: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    description: '',
    actionLabel: '',
    onConfirm: () => {}
  });

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setAccessToken(res.accessToken);
      }
    } catch (err: any) {
      console.error('Workspace Sign in error:', err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
    setSheetId(null);
  };

  // 1. Google Sheets Export Action with User Confirmation
  const triggerSheetsExport = async () => {
    if (!accessToken) return;

    setConfirmDialog({
      isOpen: true,
      title: 'Export Leads to Google Sheets',
      description: 'This operation will create or update a "CodeNexAnkit Leads & Consultations" spreadsheet in your Google Drive and write active Firestore lead records to it.',
      actionLabel: 'Confirm Export',
      onConfirm: async () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        setIsExportingSheets(true);
        setSheetsExportSuccess(null);
        try {
          // Fetch leads from Firestore
          const leadsRef = collection(db, 'leads');
          let leads: Lead[] = [];
          try {
            const snap = await getDocs(leadsRef);
            leads = snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() } as Lead));
          } catch (e) {
            handleFirestoreError(e, OperationType.GET, 'leads');
          }

          if (leads.length === 0) {
            leads = [
              {
                id: 'sample-1',
                name: 'Alex Vance',
                email: 'alex@fintechglobal.com',
                phone: '+1 555-019-2834',
                company: 'Fintech Global',
                serviceNeeded: 'Enterprise Web Application',
                budget: '$25,000 - $50,000',
                message: 'Needs high-performance scalable dashboard.',
                score: 95,
                status: 'Qualified',
                createdAt: new Date().toISOString().split('T')[0]
              }
            ];
          }

          const targetSheetId = await createOrGetLeadsSpreadsheet(accessToken);
          setSheetId(targetSheetId);
          const count = await exportLeadsToSheet(accessToken, targetSheetId, leads);
          setSheetsExportSuccess(`Successfully synced ${count} leads to Google Sheets!`);
        } catch (err: any) {
          console.error('Sheets sync error:', err);
          setSheetsExportSuccess(`Export failed: ${err.message || 'Check scopes'}`);
        } finally {
          setIsExportingSheets(false);
        }
      }
    });
  };

  // 2. Gmail Send Action with Mandatory Confirmation
  const triggerSendEmail = async () => {
    if (!accessToken) return;

    setConfirmDialog({
      isOpen: true,
      title: 'Send Email via Gmail',
      description: `Are you sure you want to send this email to "${gmailRecipient}" from your authenticated Gmail account?`,
      actionLabel: 'Send Email Now',
      onConfirm: async () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        setIsSendingEmail(true);
        setEmailStatus(null);
        try {
          await sendGmailMessage(accessToken, gmailRecipient, gmailSubject, gmailBody);
          setEmailStatus(`Email successfully sent to ${gmailRecipient}!`);
        } catch (err: any) {
          console.error('Gmail error:', err);
          setEmailStatus(`Failed to send email: ${err.message || 'Check scopes'}`);
        } finally {
          setIsSendingEmail(false);
        }
      }
    });
  };

  // 3. Google Chat Broadcast
  const fetchChatSpaces = async () => {
    if (!accessToken) return;
    try {
      const data = await listGoogleChatSpaces(accessToken);
      if (data.spaces) {
        setChatSpaces(data.spaces);
        if (data.spaces.length > 0) {
          setSelectedSpace(data.spaces[0].name);
        }
      }
    } catch (err) {
      console.warn('Error fetching Chat spaces:', err);
    }
  };

  const triggerPostChat = async () => {
    if (!accessToken || !selectedSpace) return;

    setConfirmDialog({
      isOpen: true,
      title: 'Post Message to Google Chat',
      description: `This will post a message into your Google Chat space (${selectedSpace}). Proceed?`,
      actionLabel: 'Post Message',
      onConfirm: async () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        setIsPostingChat(true);
        setChatStatus(null);
        try {
          await sendGoogleChatMessage(accessToken, selectedSpace, chatMessage);
          setChatStatus('Message successfully posted to Google Chat!');
        } catch (err: any) {
          console.error('Chat error:', err);
          setChatStatus(`Failed to post message: ${err.message || 'Check Chat API configuration'}`);
        } finally {
          setIsPostingChat(false);
        }
      }
    });
  };

  // 4. Google Forms Fetching & Syncing
  const triggerFetchForm = async () => {
    if (!accessToken || !formIdInput) return;
    setIsLoadingForm(true);
    setFormStatus(null);
    try {
      const data = await getFormResponses(accessToken, formIdInput);
      setFormResponses(data.responses || []);
      setFormStatus(`Successfully loaded ${data.responses?.length || 0} form responses.`);
    } catch (err: any) {
      console.error('Forms error:', err);
      setFormStatus(`Error: ${err.message || 'Failed to load form responses. Verify Form ID.'}`);
    } finally {
      setIsLoadingForm(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#08080c]/95 border border-white/10 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden backdrop-blur-2xl text-white">
        
        {/* Header */}
        <div className="p-6 bg-white/[0.02] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#FFD700]/20 to-blue-500/20 border border-[#FFD700]/30 text-[#FFD700]">
              <ShieldCheck className="w-5 h-5 text-[#FFD700]" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Google Workspace Hub
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                  OAuth Enabled
                </span>
              </h2>
              <p className="text-xs text-white/50">Manage Google Sheets, Gmail, Chat, and Forms integration</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Auth Banner */}
        <div className="px-6 py-4 bg-white/[0.01] border-b border-white/5 flex flex-wrap items-center justify-between gap-3">
          {user ? (
            <div className="flex items-center space-x-3">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full border border-[#FFD700]/40" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 text-[#FFD700] flex items-center justify-center font-bold text-xs">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-white">{user.displayName || user.email}</p>
                <p className="text-[10px] text-white/50 font-mono">Authenticated via Google Workspace</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-[#FFD700]" />
              <span className="text-xs text-white/70">Sign in with Google to access Sheets, Gmail, Chat & Forms APIs.</span>
            </div>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-medium text-white/70 border border-white/10 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 text-white/50" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              disabled={isAuthenticating}
              className="gsi-material-button relative overflow-hidden bg-white text-gray-900 font-semibold px-4 py-2 rounded-full text-xs shadow-md hover:bg-gray-100 transition-all flex items-center gap-2 cursor-pointer border border-gray-300"
            >
              {isAuthenticating ? (
                <Loader2 className="w-4 h-4 animate-spin text-gray-700" />
              ) : (
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
              )}
              <span>Sign in with Google</span>
            </button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-4 flex space-x-2 border-b border-white/10 bg-white/[0.01]">
          <button
            onClick={() => setActiveTab('sheets')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'sheets'
                ? 'border-[#FFD700] text-[#FFD700]'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Google Sheets</span>
          </button>

          <button
            onClick={() => setActiveTab('gmail')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'gmail'
                ? 'border-[#FFD700] text-[#FFD700]'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4 text-red-400" />
            <span>Gmail</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('chat');
              fetchChatSpaces();
            }}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'chat'
                ? 'border-[#FFD700] text-[#FFD700]'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span>Google Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('forms')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'forms'
                ? 'border-[#FFD700] text-[#FFD700]'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>Google Forms</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {!user && (
            <div className="p-4 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center space-x-3 text-xs text-[#FFD700]">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>Please click <strong>Sign in with Google</strong> above to authorize Google Workspace APIs.</span>
            </div>
          )}

          {/* TAB 1: GOOGLE SHEETS */}
          {activeTab === 'sheets' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                      Google Sheets Auto-Sync
                    </h3>
                    <p className="text-xs text-white/50">Export Firestore discovery leads & bookings to your spreadsheet in 1 click.</p>
                  </div>

                  {sheetId && (
                    <a
                      href={`https://docs.google.com/spreadsheets/d/${sheetId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono flex items-center gap-1 hover:bg-emerald-500/30 transition-colors"
                    >
                      <span>Open Sheet</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <button
                  onClick={triggerSheetsExport}
                  disabled={!user || isExportingSheets}
                  className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isExportingSheets ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Syncing with Google Sheets API...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 text-black" />
                      <span>Sync All Leads to Google Sheets</span>
                    </>
                  )}
                </button>

                {sheetsExportSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{sheetsExportSuccess}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: GMAIL */}
          {activeTab === 'gmail' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-400" />
                  Direct Gmail Composer
                </h3>
                <p className="text-xs text-white/50">Send discovery call follow-ups directly through your Gmail account.</p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono text-white/70 mb-1">Recipient Email</label>
                    <input
                      type="email"
                      value={gmailRecipient}
                      onChange={(e) => setGmailRecipient(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/70 mb-1">Subject</label>
                    <input
                      type="text"
                      value={gmailSubject}
                      onChange={(e) => setGmailSubject(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/70 mb-1">Message Body</label>
                    <textarea
                      rows={4}
                      value={gmailBody}
                      onChange={(e) => setGmailBody(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <button
                    onClick={triggerSendEmail}
                    disabled={!user || isSendingEmail}
                    className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold text-xs shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSendingEmail ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending via Gmail API...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Email via Gmail</span>
                      </>
                    )}
                  </button>

                  {emailStatus && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
                      {emailStatus}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GOOGLE CHAT */}
          {activeTab === 'chat' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  Google Chat Space Broadcast
                </h3>
                <p className="text-xs text-white/50">Notify team members in Google Chat when new leads qualify.</p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono text-white/70 mb-1">Select Chat Space</label>
                    {chatSpaces.length > 0 ? (
                      <select
                        value={selectedSpace}
                        onChange={(e) => setSelectedSpace(e.target.value)}
                        className="w-full bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-400"
                      >
                        {chatSpaces.map((space) => (
                          <option key={space.name} value={space.name}>
                            {space.displayName || space.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        placeholder="spaces/AAAA123456"
                        value={selectedSpace}
                        onChange={(e) => setSelectedSpace(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-blue-400"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/70 mb-1">Notification Payload</label>
                    <textarea
                      rows={3}
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <button
                    onClick={triggerPostChat}
                    disabled={!user || !selectedSpace || isPostingChat}
                    className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xs shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isPostingChat ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Posting to Google Chat...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Broadcast to Google Chat</span>
                      </>
                    )}
                  </button>

                  {chatStatus && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
                      {chatStatus}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GOOGLE FORMS */}
          {activeTab === 'forms' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  Google Forms Responses Sync
                </h3>
                <p className="text-xs text-white/50">Import survey & discovery questionnaire submissions from Google Forms.</p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono text-white/70 mb-1">Google Form ID</label>
                    <input
                      type="text"
                      placeholder="e.g. 1FAIpQLSe-xxxx-xxxx"
                      value={formIdInput}
                      onChange={(e) => setFormIdInput(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <button
                    onClick={triggerFetchForm}
                    disabled={!user || !formIdInput || isLoadingForm}
                    className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold text-xs shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoadingForm ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Fetching Form Responses...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        <span>Fetch Form Submissions</span>
                      </>
                    )}
                  </button>

                  {formStatus && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
                      {formStatus}
                    </div>
                  )}

                  {formResponses.length > 0 && (
                    <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 space-y-2 max-h-40 overflow-y-auto">
                      <p className="text-xs font-mono text-purple-300">Responses List ({formResponses.length}):</p>
                      {formResponses.map((resp, i) => (
                        <div key={i} className="text-[11px] text-white/70 border-b border-white/5 pb-1">
                          Response #{i + 1} - Submitted: {resp.createTime || 'Recently'}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Mandatory User Confirmation Dialog for Mutating API Actions */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-[#0d0d14] border border-[#FFD700]/30 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-[#FFD700]">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">{confirmDialog.title}</h3>
            </div>

            <p className="text-xs text-white/70 leading-relaxed">
              {confirmDialog.description}
            </p>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-medium text-white/70 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={confirmDialog.onConfirm}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFB900] text-black font-bold text-xs shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] transition-all cursor-pointer"
              >
                {confirmDialog.actionLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
