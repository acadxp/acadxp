"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { profileService } from "@/services/profile.service";
import { academicInfoService } from "@/services/academic-info.service";
import { notificationPreferenceService } from "@/services/notification-preference.service";
import { apiKeyService } from "@/services/api-key.service";
import { motion, AnimatePresence } from "motion/react";
import {
  User, GraduationCap, Bell, Palette, Lock, Key,
  ShieldAlert, CheckCircle2, Github, Linkedin, Globe, Twitter,
  Laptop, Smartphone, Trash2, Loader2, Eye, EyeOff, Copy, X,
} from "lucide-react";
import type { Profile } from "@/types";
import type { NotificationPreference } from "@/services/notification-preference.service";
import type { ApiKey } from "@/services/api-key.service";
import { maskApiKey, getApiKeyStatus, formatLastUsed, generateApiKeyName } from "@/lib/utils";
import { useRouter } from "next/navigation";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "academic", label: "Academic Info", icon: GraduationCap },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Lock },
  { id: "api", label: "API Keys", icon: Key },
  { id: "danger", label: "Danger Zone", icon: ShieldAlert },
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function useSuccessToast() {
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const showToast = useCallback(() => {
    setShow(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 3000);
  }, []);
  return { show, showToast };
}

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("profile");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [acadInfoId, setAcadInfoId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { show: showSuccess, showToast } = useSuccessToast();

  useEffect(() => {
    profileService.getProfile().then((res) => {
      const p = res.data.data?.profile ?? null;
      setProfile(p);
      setAcadInfoId(p?.academicInfo?.id ?? null);
    }).catch(() => {});
  }, []);

  const wrapSave = async (fn: () => Promise<any>) => {
    setSaving(true);
    try {
      await fn();
      showToast();
      const res = await profileService.getProfile();
      setProfile(res.data.data?.profile ?? null);
      setAcadInfoId(res.data.data?.profile?.academicInfo?.id ?? null);
    } catch {
      // error handled by toast or ignore
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      <div className="max-w-5xl mx-auto py-8 px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <nav className="w-full md:w-48 flex flex-row md:flex-col gap-1 overflow-x-auto md:sticky md:top-24 h-fit">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`whitespace-nowrap flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  activeSection === section.id
                    ? "bg-primary/10 text-primary"
                    : "text-text-secondary hover:bg-bg-primary hover:text-text-primary"
                }`}
              >
                <section.icon size={16} />
                {section.label}
              </button>
            ))}
          </nav>

          <div className="flex-1 space-y-10 pb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeSection === "profile" && (
                  <ProfileSection
                    user={user}
                    profile={profile}
                    onSaveProfile={(data) => wrapSave(() => profileService.updateProfile(data))}
                    saving={saving}
                  />
                )}
                {activeSection === "academic" && (
                  <AcademicSection
                    profile={profile}
                    onSave={(data) => wrapSave(() => academicInfoService.updateMyInfo(data))}
                    saving={saving}
                  />
                )}
                {activeSection === "notifications" && (
                  <NotificationsSection />
                )}
                {activeSection === "appearance" && (
                  <AppearanceSection
                    profile={profile}
                    onSave={(data) => wrapSave(() => profileService.updateProfile(data))}
                    saving={saving}
                  />
                )}
                {activeSection === "security" && <SecuritySection />}
                {activeSection === "api" && (
                  <ApiKeysSection />
                )}
                {activeSection === "danger" && (
                  <DangerZoneSection
                    onLogout={async () => {
                      await logout();
                      router.push("/login");
                    }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-8 left-1/2 z-[60] bg-primary text-white shadow-xl px-6 py-3 rounded-full font-bold flex items-center gap-3"
          >
            <CheckCircle2 size={20} />
            Settings saved successfully
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Profile Section ─── */
function ProfileSection({
  user,
  profile,
  onSaveProfile,
  saving,
}: {
  user: any;
  profile: Profile | null;
  onSaveProfile: (data: any) => Promise<void>;
  saving: boolean;
}) {
  const [name, setName] = useState(user?.name ?? "");
  const [username, setUsername] = useState(profile?.username ?? "");
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [usernameSaving, setUsernameSaving] = useState(false);
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [location, setLocation] = useState(profile?.location ?? "");
  const socials = profile?.socials as Record<string, string> | undefined;
  const [github, setGithub] = useState(socials?.github ?? "");
  const [linkedin, setLinkedin] = useState(socials?.linkedin ?? "");
  const [twitter, setTwitter] = useState(socials?.twitter ?? "");
  const [website, setWebsite] = useState(socials?.website ?? "");

  useEffect(() => {
    setName(user?.name ?? "");
  }, [user?.name]);

  useEffect(() => {
    setUsername(profile?.username ?? "");
    setBio(profile?.bio ?? "");
    setLocation(profile?.location ?? "");
    const s = (profile?.socials ?? {}) as Record<string, string>;
    setGithub(s.github ?? "");
    setLinkedin(s.linkedin ?? "");
    setTwitter(s.twitter ?? "");
    setWebsite(s.website ?? "");
  }, [profile]);

  const checkUsername = async () => {
    if (!username.trim() || username === profile?.username) return true;
    setUsernameStatus("checking");
    try {
      await profileService.checkUsername(username);
      setUsernameStatus("available");
      return true;
    } catch {
      setUsernameStatus("taken");
      return false;
    }
  };

  const handleSaveUsername = async () => {
    if (!username.trim() || usernameStatus === "taken") return;
    const isAvailable = await checkUsername();
    if (!isAvailable) return;
    setUsernameSaving(true);
    try {
      await onSaveProfile({ username });
      setUsernameStatus("idle");
    } finally {
      setUsernameSaving(false);
    }
  };

  const handleSaveProfile = () =>
    onSaveProfile({
      name,
      bio,
      location,
      socials: { github, linkedin, twitter, website },
    });

  const usernameChanged = username !== profile?.username;

  return (
    <section>
      <h2 className="text-2xl font-extrabold tracking-tight text-text-primary mb-8">Profile Settings</h2>
      <div className="bg-bg-primary p-8 rounded-xl border border-bg-tertiary space-y-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold shadow-lg">
            {getInitials(user?.name ?? "U")}
          </div>
          <button className="text-sm font-semibold text-primary hover:bg-primary/5 px-4 py-2 rounded-xl transition-colors border border-primary/20">
            Change avatar
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <InputGroup label="Full name" value={name} onChange={setName} />

          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text-secondary">Username</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-medium">@</span>
                <input
                  className="w-full pl-8 bg-bg-primary border border-bg-tertiary rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 py-2.5 outline-none transition-all text-text-primary"
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setUsernameStatus("idle"); }}
                />
              </div>
              <button
                onClick={checkUsername}
                disabled={!usernameChanged || !username.trim()}
                className="border border-bg-tertiary text-text-secondary px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-bg-secondary transition-all disabled:opacity-50 h-[42px]"
              >
                {usernameStatus === "checking" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Check"}
              </button>
              <button
                onClick={handleSaveUsername}
                disabled={usernameSaving || usernameStatus === "taken" || !usernameChanged || !username.trim()}
                className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 h-[42px]"
              >
                {usernameSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
              </button>
            </div>
            {usernameStatus === "available" && (
              <p className="text-xs font-bold text-emerald-600 mt-1">Username is available</p>
            )}
            {usernameStatus === "taken" && (
              <p className="text-xs font-bold text-red-500 mt-1">Username is already taken</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text-secondary">Email</label>
            <div className="flex items-center gap-3">
              <input
                className="flex-1 bg-bg-secondary border border-bg-tertiary text-text-secondary rounded-xl px-4 py-2.5 cursor-not-allowed"
                readOnly
                type="email"
                defaultValue={user?.email ?? ""}
              />
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                Verified
              </span>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text-secondary">Bio</label>
            <textarea
              className="w-full bg-bg-primary border border-bg-tertiary rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 py-2.5 outline-none transition-all resize-none text-text-primary"
              placeholder="Tell us about your learning journey..."
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <InputGroup label="Location" value={location} onChange={setLocation} />
        </div>

        <div className="pt-4 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-muted">Social Connections</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SocialInput icon={Github} placeholder="GitHub" value={github} onChange={setGithub} />
            <SocialInput icon={Linkedin} placeholder="LinkedIn" value={linkedin} onChange={setLinkedin} />
            <SocialInput icon={Twitter} placeholder="Twitter/X" value={twitter} onChange={setTwitter} />
            <SocialInput icon={Globe} placeholder="Website" value={website} onChange={setWebsite} />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Profile
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Academic Section ─── */
function AcademicSection({
  profile,
  onSave,
  saving,
}: {
  profile: Profile | null;
  onSave: (data: any) => Promise<void>;
  saving: boolean;
}) {
  const acad = profile?.academicInfo;
  const [institution, setInstitution] = useState(acad?.institution ?? "");
  const [degree, setDegree] = useState<string>(acad?.degree ?? "MASTERS");
  const [major, setMajor] = useState(acad?.major ?? "");
  const [semester, setSemester] = useState(acad?.semester ?? "");
  const [enrollmentStatus, setEnrollmentStatus] = useState<string>(acad?.enrollmentStatus ?? "FULL_TIME");
  const [enrolledDate, setEnrolledDate] = useState(
    acad?.enrolledDate ? new Date(acad.enrolledDate).toISOString().split("T")[0] : "",
  );
  const [graduationDate, setGraduationDate] = useState(
    acad?.graduationDate ? new Date(acad.graduationDate).toISOString().split("T")[0] : "",
  );

  useEffect(() => {
    const a = profile?.academicInfo;
    setInstitution(a?.institution ?? "");
    setDegree(a?.degree ?? "MASTERS");
    setMajor(a?.major ?? "");
    setSemester(a?.semester ?? "");
    setEnrollmentStatus(a?.enrollmentStatus ?? "FULL_TIME");
    setEnrolledDate(a?.enrolledDate ? new Date(a.enrolledDate).toISOString().split("T")[0] : "");
    setGraduationDate(a?.graduationDate ? new Date(a.graduationDate).toISOString().split("T")[0] : "");
  }, [profile]);

  const handleSave = () =>
    onSave({ institution, degree, major, semester, enrollmentStatus, enrolledDate, graduationDate });

  return (
    <section>
      <h2 className="text-2xl font-extrabold tracking-tight text-text-primary mb-8">Academic Info</h2>
      <div className="bg-bg-primary p-8 rounded-xl border border-bg-tertiary space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <InputGroup label="Institution name" value={institution} onChange={setInstitution} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text-secondary">Degree type</label>
            <select
              className="w-full bg-bg-primary border border-bg-tertiary rounded-xl focus:ring-2 focus:ring-primary px-4 py-2.5 outline-none text-text-primary"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            >
              <option value="BACHELORS">Bachelor&apos;s</option>
              <option value="MASTERS">Master&apos;s</option>
              <option value="PHD">PhD</option>
              <option value="DIPLOMA">Diploma</option>
              <option value="CERTIFICATE">Certificate</option>
            </select>
          </div>
          <InputGroup label="Major / Field of study" value={major} onChange={setMajor} />
          <InputGroup label="Current semester" value={semester} onChange={setSemester} />
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text-secondary">Enrollment status</label>
            <select
              className="w-full bg-bg-primary border border-bg-tertiary rounded-xl focus:ring-2 focus:ring-primary px-4 py-2.5 outline-none text-text-primary"
              value={enrollmentStatus}
              onChange={(e) => setEnrollmentStatus(e.target.value)}
            >
              <option value="FULL_TIME">Full-time</option>
              <option value="PART_TIME">Part-time</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="GRADUATED">Graduated</option>
            </select>
          </div>
          <InputGroup label="Enrollment date" type="date" value={enrolledDate} onChange={setEnrolledDate} />
          <InputGroup label="Expected graduation date" type="date" value={graduationDate} onChange={setGraduationDate} />
        </div>
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Academic Info
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Notifications Section ─── */
function NotificationsSection() {
  const [prefs, setPrefs] = useState<NotificationPreference[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    notificationPreferenceService.getPreferences().then((res) => {
      setPrefs(res.data.data ?? []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const togglePref = async (type: string, currentEnabled: boolean) => {
    const updated = prefs.map((p) =>
      p.type === type ? { ...p, enabled: !currentEnabled } : p,
    );
    if (!updated.find((p) => p.type === type)) {
      updated.push({ type, enabled: !currentEnabled } as any);
    }
    setPrefs(updated);
  };

  const savePrefs = async () => {
    setSaving(true);
    try {
      const res = await notificationPreferenceService.updatePreferences(
        prefs.map((p) => ({ type: p.type, enabled: p.enabled })),
      );
      setPrefs(res.data.data ?? []);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const allTypes = [
    { key: "STREAK", title: "Streak reminders", desc: "Get notified when your streak is at risk" },
    { key: "DEADLINE", title: "Deadline alerts", desc: "Reminders 24h before challenge deadlines" },
    { key: "LEVEL_UP", title: "Level-up celebration", desc: "Notification when you reach a new level" },
    { key: "BADGE", title: "Badge unlocked", desc: "When you earn a new badge" },
    { key: "GOAL", title: "Weekly summary", desc: "Your weekly XP and progress digest" },
    { key: "GOAL", title: "Goal milestones", desc: "When you hit 25%, 50%, 75%, 100% of a goal" },
  ];

  if (loading) return <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto mt-12" />;

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">Notifications</h2>
        <button
          onClick={savePrefs}
          disabled={saving}
          className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Save
        </button>
      </div>
      <div className="bg-bg-primary rounded-xl border border-bg-tertiary divide-y divide-bg-tertiary overflow-hidden">
        {prefs.length === 0 ? (
          <p className="p-6 text-text-muted text-sm">No notification preferences yet.</p>
        ) : (
          prefs.map((p) => {
            const info = allTypes.find((t) => t.key === p.type);
            return (
              <ToggleItem
                key={p.id}
                title={info?.title ?? p.type}
                description={info?.desc ?? ""}
                checked={p.enabled}
                onChange={() => togglePref(p.type, p.enabled)}
              />
            );
          })
        )}
      </div>
    </section>
  );
}

/* ─── Appearance Section ─── */
function AppearanceSection({
  profile,
  onSave,
  saving,
}: {
  profile: Profile | null;
  onSave: (data: any) => Promise<void>;
  saving: boolean;
}) {
  const prefs = (profile?.preferences ?? {}) as any;
  const [theme, setTheme] = useState(prefs.theme ?? "system");
  const [accentColor, setAccentColor] = useState(prefs.accentColor ?? "#4f46e5");

  useEffect(() => {
    const p = (profile?.preferences ?? {}) as any;
    setTheme(p.theme ?? "system");
    setAccentColor(p.accentColor ?? "#4f46e5");
  }, [profile]);

  const handleSave = () => onSave({ preferences: { theme, accentColor } });

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">Appearance</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Save
        </button>
      </div>
      <div className="bg-bg-primary p-8 rounded-xl border border-bg-tertiary space-y-10">
        <div className="space-y-4">
          <label className="text-sm font-bold text-text-secondary">Theme</label>
          <div className="flex gap-3">
            {["light", "dark", "system"].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-6 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                  theme === t
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-bg-tertiary text-text-secondary hover:border-text-muted"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-text-secondary">Accent color</label>
          <div className="flex flex-wrap gap-4">
            {["#4f46e5", "#7c3aed", "#0d9488", "#f59e0b", "#f43f5e", "#334155"].map((c) => (
              <ColorSwatch
                key={c}
                color={c}
                active={accentColor === c}
                onClick={() => setAccentColor(c)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Security Section ─── */
function SecuritySection() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <section>
      <h2 className="text-2xl font-extrabold tracking-tight text-text-primary mb-8">Security</h2>
      <div className="bg-bg-primary p-8 rounded-xl border border-bg-tertiary space-y-10">
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-muted">Change Password</h3>
          <div className="space-y-4 max-w-md">
            <PasswordInput label="Current password" show={showCurrent} onToggle={() => setShowCurrent(!showCurrent)} />
            <PasswordInput label="New password" show={showNew} onToggle={() => setShowNew(!showNew)} />
            <div className="pt-2">
              <div className="flex gap-1 h-1.5 mb-1">
                <div className="flex-1 bg-primary rounded-full" />
                <div className="flex-1 bg-primary rounded-full" />
                <div className="flex-1 bg-primary rounded-full" />
                <div className="flex-1 bg-bg-tertiary rounded-full" />
              </div>
              <p className="text-[10px] font-bold text-primary">Strong</p>
            </div>
            <PasswordInput label="Confirm new password" show={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} />
          </div>
          <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all">
            Update password
          </button>
        </div>

        <div className="border-t border-bg-tertiary pt-10 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-muted">Active Sessions</h3>
          <div className="space-y-4">
            <SessionItem icon={Laptop} title='MacBook Pro 16"' details="192.168.x.x · Last active: Just now" current />
            <SessionItem icon={Smartphone} title="iPhone 15 Pro" details="172.20.x.x · Last active: 2 hours ago" />
          </div>
          <button className="text-xs font-bold text-red-500 hover:underline uppercase tracking-widest">
            Revoke all other sessions
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── API Keys Section ─── */
function ApiKeysSection() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchKeys = async () => {
    try {
      const res = await apiKeyService.getKeys();
      setKeys(res.data.data ?? []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchKeys(); }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await apiKeyService.createKey(generateApiKeyName());
      const created = res.data.data;
      if (created?.rawKey) {
        setNewKey(created.rawKey);
      }
      await fetchKeys();
    } catch {
      // ignore
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiKeyService.deleteKey(id);
      setKeys((prev) => prev.filter((k) => k.id !== id));
    } catch {
      // ignore
    }
  };

  const copyToClipboard = async () => {
    if (!newKey) return;
    try {
      await navigator.clipboard.writeText(newKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">API Keys</h2>
          <p className="text-text-secondary text-sm mt-1">Use API keys to access AcadXP from external tools or scripts.</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {generating && <Loader2 className="w-4 h-4 animate-spin" />}
          Generate new key
        </button>
      </div>

      {/* One-time key reveal */}
      <AnimatePresence>
        {newKey && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-amber-800 mb-1">Key generated — copy it now. You won&apos;t see it again.</p>
                <code className="block text-xs bg-amber-100 px-3 py-2 rounded-lg text-amber-900 font-mono break-all select-all">
                  {newKey}
                </code>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={copyToClipboard}
                  className="p-2 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
                >
                  {copied ? <CheckCircle2 size={18} className="text-emerald-600" /> : <Copy size={18} className="text-amber-700" />}
                </button>
                <button onClick={() => setNewKey(null)} className="p-2 hover:bg-amber-200 rounded-lg transition-colors">
                  <X size={18} className="text-amber-700" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-bg-primary rounded-xl border border-bg-tertiary overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : keys.length === 0 ? (
          <p className="p-8 text-text-muted text-sm text-center">No API keys yet.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-bg-secondary border-b border-bg-tertiary">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Key Name</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Created</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Last Used</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-tertiary">
              {keys.map((key) => {
                const status = getApiKeyStatus(key);
                return (
                  <tr key={key.id} className="hover:bg-bg-secondary transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-sm text-text-primary">{key.name ?? "Unnamed"}</p>
                      <code className="text-[10px] bg-bg-tertiary px-2 py-0.5 rounded text-text-secondary font-mono">
                        {maskApiKey(key.key)}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {new Date(key.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{formatLastUsed(key.lastUsedAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(key.id)} className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

/* ─── Danger Zone Section ─── */
function DangerZoneSection({ onLogout }: { onLogout: () => void }) {
  return (
    <section>
      <h2 className="text-2xl font-extrabold tracking-tight text-text-primary mb-8">Danger Zone</h2>
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 space-y-8">
        <div className="flex items-center justify-between gap-8 flex-wrap">
          <div>
            <p className="font-bold text-red-600">Delete all progress</p>
            <p className="text-sm text-text-secondary max-w-lg">Permanently reset your XP, level, badges and challenge history. Your account and courses remain.</p>
          </div>
          <button className="px-6 py-2.5 border-2 border-red-500 text-red-500 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all whitespace-nowrap">
            Reset progress
          </button>
        </div>
        <div className="pt-8 border-t border-red-100 flex items-center justify-between gap-8 flex-wrap">
          <div>
            <p className="font-bold text-red-600">Logout</p>
            <p className="text-sm text-text-secondary max-w-lg">Sign out of your account on this device.</p>
          </div>
          <button
            onClick={onLogout}
            className="px-6 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-200 whitespace-nowrap"
          >
            Logout
          </button>
        </div>
        <div className="pt-8 border-t border-red-100 flex items-center justify-between gap-8 flex-wrap">
          <div>
            <p className="font-bold text-red-600">Delete account</p>
            <p className="text-sm text-text-secondary max-w-lg">Permanently delete your account and all associated data. This cannot be undone.</p>
          </div>
          <button className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 whitespace-nowrap">
            Delete account
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Helper Components ─── */
function InputGroup({
  label, value, onChange, type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-bold text-text-secondary">{label}</label>
      <input
        className="w-full bg-bg-primary border border-bg-tertiary rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 py-2.5 outline-none transition-all text-text-primary"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function SocialInput({
  icon: Icon, placeholder, value, onChange,
}: {
  icon: any;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
      <input
        className="w-full pl-11 bg-bg-primary border border-bg-tertiary rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 py-2.5 outline-none transition-all text-text-primary"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function PasswordInput({
  label, show, onToggle,
}: {
  label: string;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-bold text-text-secondary">{label}</label>
      <div className="relative">
        <input
          className="w-full bg-bg-primary border border-bg-tertiary rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 py-2.5 outline-none transition-all text-text-primary pr-10"
          type={show ? "text" : "password"}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

function ToggleItem({
  title, description, checked, onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-6 hover:bg-bg-secondary transition-colors">
      <div>
        <p className="font-bold text-text-primary">{title}</p>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? "bg-primary" : "bg-bg-tertiary"}`}
      >
        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

function ColorSwatch({
  color, active = false, onClick,
}: {
  color: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 rounded-full transition-all hover:scale-110 ${active ? "ring-2 ring-offset-2 ring-primary" : ""}`}
      style={{ backgroundColor: color }}
    />
  );
}

function SessionItem({
  icon: Icon, title, details, current = false,
}: {
  icon: any;
  title: string;
  details: string;
  current?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border ${current ? "border-primary/20 bg-primary/5" : "border-bg-tertiary bg-bg-primary"}`}>
      <div className="flex items-center gap-4">
        <Icon className="text-text-muted" size={24} />
        <div>
          <p className="font-bold text-sm text-text-primary">{title}</p>
          <p className="text-xs text-text-secondary">{details}</p>
        </div>
      </div>
      {current ? (
        <span className="text-xs font-bold text-primary uppercase tracking-widest px-2 py-1 bg-primary/10 rounded">Current</span>
      ) : (
        <button className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1 rounded transition-colors uppercase tracking-widest">Revoke</button>
      )}
    </div>
  );
}
