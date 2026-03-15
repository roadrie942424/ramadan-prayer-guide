import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Trophy, User, LogIn, Star, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LeaderboardEntry {
  id: string;
  username: string;
  points: number;
  ayahs_read: number;
}

const LeaderboardTab = () => {
  const [username, setUsername] = useState(() => localStorage.getItem("quran-username") || "");
  const [inputName, setInputName] = useState("");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("leaderboard")
      .select("*")
      .order("points", { ascending: false })
      .limit(50);
    setEntries((data as LeaderboardEntry[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  // Sync local points to cloud
  useEffect(() => {
    if (!username) return;
    const readAyahs = JSON.parse(localStorage.getItem("quran-read-ayahs") || "[]");
    const points = readAyahs.length * 10;
    const ayahsRead = readAyahs.length;

    const syncPoints = async () => {
      const { data: existing } = await supabase
        .from("leaderboard")
        .select("id")
        .eq("username", username)
        .maybeSingle();

      if (existing) {
        await supabase
          .from("leaderboard")
          .update({ points, ayahs_read: ayahsRead })
          .eq("username", username);
      } else {
        await supabase
          .from("leaderboard")
          .insert({ username, points, ayahs_read: ayahsRead });
      }
      fetchLeaderboard();
    };
    syncPoints();
  }, [username, fetchLeaderboard]);

  const handleLogin = () => {
    const name = inputName.trim();
    if (!name) return;
    localStorage.setItem("quran-username", name);
    setUsername(name);
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="w-5 h-5 text-primary" />;
    if (index === 1) return <Crown className="w-5 h-5 text-muted-foreground" />;
    if (index === 2) return <Crown className="w-5 h-5 text-accent" />;
    return <span className="w-5 h-5 flex items-center justify-center text-xs text-muted-foreground font-bold">{index + 1}</span>;
  };

  if (!username) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-6" dir="rtl">
        <motion.div className="text-center space-y-3"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-16 h-16 rounded-full gold-border bg-secondary/40 flex items-center justify-center mx-auto gold-glow">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-display gold-text">سجّل اسمك</h3>
          <p className="text-sm text-muted-foreground font-arabic">أدخل اسمك للمشاركة في لوحة الصدارة</p>
        </motion.div>

        <motion.div className="w-full max-w-xs space-y-3"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <input type="text" value={inputName} onChange={e => setInputName(e.target.value)}
            placeholder="اكتب اسمك هنا..." dir="rtl"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            className="w-full h-11 bg-secondary/60 border border-border rounded-xl px-4 text-sm font-arabic text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          <button onClick={handleLogin}
            className="w-full h-11 gold-gradient rounded-xl text-sm font-arabic font-bold text-primary-foreground flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <LogIn className="w-4 h-4" /> دخول
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-4" dir="rtl">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 gold-border rounded-full px-5 py-2 bg-secondary/40">
          <Trophy className="w-5 h-5 text-primary" />
          <span className="font-display gold-text text-lg">لوحة الصدارة</span>
        </div>
        <p className="text-xs text-muted-foreground font-arabic">مرحباً <span className="text-primary">{username}</span></p>
      </div>

      {/* Leaderboard list */}
      <div className="space-y-2 px-2">
        {loading ? (
          <p className="text-center text-muted-foreground text-sm font-arabic py-8">جاري التحميل...</p>
        ) : entries.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm font-arabic py-8">لا يوجد مشاركون بعد</p>
        ) : (
          entries.map((entry, i) => (
            <motion.div key={entry.id}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
                entry.username === username ? "gold-border bg-primary/10" : "bg-secondary/40 border border-border/50"
              }`}>
              {getRankIcon(i)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-arabic text-foreground truncate">{entry.username}</p>
                <p className="text-xs text-muted-foreground font-arabic">{entry.ayahs_read} آية</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Star className="w-3.5 h-3.5 text-primary" />
                <span className="text-sm font-bold gold-text">{entry.points}</span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeaderboardTab;
