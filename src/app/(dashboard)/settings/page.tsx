"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { profileService } from "@/services/profile.service";
import { motion, AnimatePresence } from "motion/react";
import {
  User, GraduationCap, Bell, Palette, Lock, Key,
  ShieldAlert, CheckCircle2, Github, Linkedin, Globe, Twitter,
  Laptop, Smartphone, Trash2, Loader2, Eye, EyeOff,
} from "lucide-react";
import type { Profile } from "@/types";
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

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("profile");
  const [showSuccess, setShowSuccess] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    profileService.getProfile().then((res) => {
      setProfile(res.data.data?.profile ?? null);
    }).catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      <div className="max-w-5xl mx-auto py-8 px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sub-navigation */}
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

          {/* Content */}
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
                    onSave={handleSave}
                    saving={saving}
                  />
                )}
                {activeSection === "academic" && (
                  <AcademicSection onSave={handleSave} saving={saving} />
                )}
                {activeSection === "notifications" && <NotificationsSection />}
                {activeSection === "appearance" && <AppearanceSection />}
                {activeSection === "security" && <SecuritySection />}
                {activeSection === "api" && <ApiKeysSection />}
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

      {/* Success Toast */}
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
  onSave,
  saving,
}: {
  user: any;
  profile: Profile | null;
  onSave: () => void;
  saving: boolean;
}) {
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
          <InputGroup label="Full name" defaultValue={user?.name ?? ""} />
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text-secondary">Username</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-medium">@</span>
              <input
                className="w-full pl-8 bg-bg-primary border border-bg-tertiary rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 py-2.5 outline-none transition-all text-text-primary"
                type="text"
                defaultValue={profile?.username ?? ""}
              />
            </div>
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
              defaultValue={profile?.bio ?? ""}
            />
          </div>
          <InputGroup label="Location" defaultValue={profile?.location ?? ""} />
        </div>

        <div className="pt-4 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-muted">Social Connections</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SocialInput icon={Github} placeholder="GitHub" defaultValue={profile?.socials?.github ?? ""} />
            <SocialInput icon={Linkedin} placeholder="LinkedIn" defaultValue={profile?.socials?.linkedin ?? ""} />
            <SocialInput icon={Twitter} placeholder="Twitter/X" defaultValue={profile?.socials?.twitter ?? ""} />
            <SocialInput icon={Globe} placeholder="Website" defaultValue={profile?.socials?.website ?? ""} />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={onSave}
            disabled={saving}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Academic Section ─── */
function AcademicSection({ onSave, saving }: { onSave: () => void; saving: boolean }) {
  return (
    <section>
      <h2 className="text-2xl font-extrabold tracking-tight text-text-primary mb-8">Academic Info</h2>
      <div className="bg-bg-primary p-8 rounded-xl border border-bg-tertiary space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <InputGroup label="Institution name" defaultValue="" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text-secondary">Degree type</label>
            <select className="w-full bg-bg-primary border border-bg-tertiary rounded-xl focus:ring-2 focus:ring-primary px-4 py-2.5 outline-none text-text-primary">
              <option>Bachelor&apos;s</option>
              <option selected>Master&apos;s</option>
              <option>PhD</option>
              <option>Diploma</option>
              <option>Certificate</option>
            </select>
          </div>
          <InputGroup label="Major / Field of study" defaultValue="" />
          <InputGroup label="Current semester" defaultValue="" />
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text-secondary">Enrollment status</label>
            <select className="w-full bg-bg-primary border border-bg-tertiary rounded-xl focus:ring-2 focus:ring-primary px-4 py-2.5 outline-none text-text-primary">
              <option selected>Full-time</option>
              <option>Part-time</option>
              <option>Suspended</option>
              <option>Graduated</option>
            </select>
          </div>
          <InputGroup label="Enrollment date" type="date" />
          <InputGroup label="Expected graduation date" type="date" />
        </div>
        <div className="flex justify-end pt-4">
          <button
            onClick={onSave}
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
  return (
    <section>
      <h2 className="text-2xl font-extrabold tracking-tight text-text-primary mb-8">Notifications</h2>
      <div className="bg-bg-primary rounded-xl border border-bg-tertiary divide-y divide-bg-tertiary overflow-hidden">
        <ToggleItem title="Streak reminders" description="Get notified when your streak is at risk" defaultChecked />
        <ToggleItem title="Deadline alerts" description="Reminders 24h before challenge deadlines" defaultChecked />
        <ToggleItem title="Level-up celebration" description="Notification when you reach a new level" />
        <ToggleItem title="Badge unlocked" description="When you earn a new badge" defaultChecked />
        <ToggleItem title="Weekly summary" description="Your weekly XP and progress digest" />
        <ToggleItem title="Goal milestones" description="When you hit 25%, 50%, 75%, 100% of a goal" defaultChecked />
      </div>
    </section>
  );
}

/* ─── Appearance Section ─── */
function AppearanceSection() {
  return (
    <section>
      <h2 className="text-2xl font-extrabold tracking-tight text-text-primary mb-8">Appearance</h2>
      <div className="bg-bg-primary p-8 rounded-xl border border-bg-tertiary space-y-10">
        <div className="space-y-4">
          <label className="text-sm font-bold text-text-secondary">Theme</label>
          <div className="grid grid-cols-2 gap-6 max-w-md">
            <ThemeCard label="Light" active />
            <ThemeCard label="Dark" dark />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input
              className="rounded border-bg-tertiary text-primary focus:ring-primary"
              id="system"
              type="checkbox"
            />
            <label className="text-sm text-text-secondary" htmlFor="system">
              Follow system default
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-text-secondary">Accent color</label>
          <div className="flex flex-wrap gap-4">
            <ColorSwatch color="#4f46e5" active />
            <ColorSwatch color="#7c3aed" />
            <ColorSwatch color="#0d9488" />
            <ColorSwatch color="#f59e0b" />
            <ColorSwatch color="#f43f5e" />
            <ColorSwatch color="#334155" />
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
            <PasswordInput
              label="Current password"
              show={showCurrent}
              onToggle={() => setShowCurrent(!showCurrent)}
            />
            <PasswordInput
              label="New password"
              show={showNew}
              onToggle={() => setShowNew(!showNew)}
            />
            <div className="pt-2">
              <div className="flex gap-1 h-1.5 mb-1">
                <div className="flex-1 bg-primary rounded-full" />
                <div className="flex-1 bg-primary rounded-full" />
                <div className="flex-1 bg-primary rounded-full" />
                <div className="flex-1 bg-bg-tertiary rounded-full" />
              </div>
              <p className="text-[10px] font-bold text-primary">Strong</p>
            </div>
            <PasswordInput
              label="Confirm new password"
              show={showConfirm}
              onToggle={() => setShowConfirm(!showConfirm)}
            />
          </div>
          <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all">
            Update password
          </button>
        </div>

        <div className="border-t border-bg-tertiary pt-10 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-muted">Active Sessions</h3>
          <div className="space-y-4">
            <SessionItem
              icon={Laptop}
              title='MacBook Pro 16"'
              details="192.168.x.x &middot; Last active: Just now"
              current
            />
            <SessionItem
              icon={Smartphone}
              title="iPhone 15 Pro"
              details="172.20.x.x &middot; Last active: 2 hours ago"
            />
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
  return (
    <section>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">API Keys</h2>
          <p className="text-text-secondary text-sm mt-1">
            Use API keys to access AcadXP from external tools or scripts.
          </p>
        </div>
        <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-all">
          Generate new key
        </button>
      </div>
      <div className="bg-bg-primary rounded-xl border border-bg-tertiary overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-bg-secondary border-b border-bg-tertiary">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Key Name</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Created</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Last Used</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-tertiary">
            <ApiKeyRow name="VS Code Extension" keyStr="axp_live_••••••••••••••••3f9a" date="Oct 12, 2023" lastUsed="2 days ago" />
            <ApiKeyRow name="Personal CLI Tool" keyStr="axp_live_••••••••••••••••8e12" date="Jan 05, 2024" lastUsed="Never" />
          </tbody>
        </table>
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
            <p className="text-sm text-text-secondary max-w-lg">
              Permanently reset your XP, level, badges and challenge history. Your account and courses remain.
            </p>
          </div>
          <button className="px-6 py-2.5 border-2 border-red-500 text-red-500 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all whitespace-nowrap">
            Reset progress
          </button>
        </div>
        <div className="pt-8 border-t border-red-100 flex items-center justify-between gap-8 flex-wrap">
          <div>
            <p className="font-bold text-red-600">Logout</p>
            <p className="text-sm text-text-secondary max-w-lg">
              Sign out of your account on this device.
            </p>
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
            <p className="text-sm text-text-secondary max-w-lg">
              Permanently delete your account and all associated data. This cannot be undone.
            </p>
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
  label,
  defaultValue = "",
  type = "text",
}: {
  label: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-bold text-text-secondary">{label}</label>
      <input
        className="w-full bg-bg-primary border border-bg-tertiary rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 py-2.5 outline-none transition-all text-text-primary"
        type={type}
        defaultValue={defaultValue}
      />
    </div>
  );
}

function SocialInput({
  icon: Icon,
  placeholder,
  defaultValue = "",
}: {
  icon: any;
  placeholder: string;
  defaultValue?: string;
}) {
  return (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
      <input
        className="w-full pl-11 bg-bg-primary border border-bg-tertiary rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 py-2.5 outline-none transition-all text-text-primary"
        placeholder={placeholder}
        type="text"
        defaultValue={defaultValue}
      />
    </div>
  );
}

function PasswordInput({
  label,
  show,
  onToggle,
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
  title,
  description,
  defaultChecked = false,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between p-6 hover:bg-bg-secondary transition-colors">
      <div>
        <p className="font-bold text-text-primary">{title}</p>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? "bg-primary" : "bg-bg-tertiary"}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

function ThemeCard({
  label,
  active = false,
  dark = false,
}: {
  label: string;
  active?: boolean;
  dark?: boolean;
}) {
  return (
    <div className="cursor-pointer group">
      <div
        className={`aspect-video rounded-xl border-2 overflow-hidden relative p-3 transition-all ${
          active
            ? "border-primary ring-4 ring-primary/10"
            : "border-transparent hover:border-bg-tertiary"
        } ${dark ? "bg-text-primary" : "bg-bg-secondary"}`}
      >
        <div
          className={`w-full h-2 rounded-full mb-2 ${dark ? "bg-bg-tertiary/20" : "bg-bg-tertiary"}`}
        />
        <div className="flex gap-2">
          <div
            className={`w-1/3 h-12 rounded shadow-sm ${dark ? "bg-bg-tertiary/10" : "bg-bg-primary"}`}
          />
          <div
            className={`w-2/3 h-12 rounded shadow-sm ${dark ? "bg-bg-tertiary/10" : "bg-bg-primary"}`}
          />
        </div>
        {active && (
          <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
            <CheckCircle2 className="text-primary fill-white" size={24} />
          </div>
        )}
      </div>
      <p
        className={`text-center mt-2 text-sm font-bold ${active ? "text-primary" : "text-text-secondary group-hover:text-text-primary"}`}
      >
        {label}
      </p>
    </div>
  );
}

function ColorSwatch({ color, active = false }: { color: string; active?: boolean }) {
  return (
    <button
      className={`w-8 h-8 rounded-full transition-all hover:scale-110 ${active ? "ring-2 ring-offset-2 ring-primary" : ""}`}
      style={{ backgroundColor: color }}
    />
  );
}

function SessionItem({
  icon: Icon,
  title,
  details,
  current = false,
}: {
  icon: any;
  title: string;
  details: string;
  current?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border ${
        current ? "border-primary/20 bg-primary/5" : "border-bg-tertiary bg-bg-primary"
      }`}
    >
      <div className="flex items-center gap-4">
        <Icon className="text-text-muted" size={24} />
        <div>
          <p className="font-bold text-sm text-text-primary">{title}</p>
          <p className="text-xs text-text-secondary">{details}</p>
        </div>
      </div>
      {current ? (
        <span className="text-xs font-bold text-primary uppercase tracking-widest px-2 py-1 bg-primary/10 rounded">
          Current
        </span>
      ) : (
        <button className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1 rounded transition-colors uppercase tracking-widest">
          Revoke
        </button>
      )}
    </div>
  );
}

function ApiKeyRow({
  name,
  keyStr,
  date,
  lastUsed,
}: {
  name: string;
  keyStr: string;
  date: string;
  lastUsed: string;
}) {
  return (
    <tr className="hover:bg-bg-secondary transition-colors">
      <td className="px-6 py-4">
        <p className="font-bold text-sm text-text-primary">{name}</p>
        <code className="text-[10px] bg-bg-tertiary px-2 py-0.5 rounded text-text-secondary font-mono">
          {keyStr}
        </code>
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary">{date}</td>
      <td className="px-6 py-4 text-sm text-text-secondary">{lastUsed}</td>
      <td className="px-6 py-4 text-right">
        <button className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors">
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}
