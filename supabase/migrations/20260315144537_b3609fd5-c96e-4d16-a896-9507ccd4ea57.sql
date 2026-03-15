-- Create leaderboard table for Quran reading points
CREATE TABLE public.leaderboard (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  points INTEGER NOT NULL DEFAULT 0,
  ayahs_read INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Everyone can read leaderboard
CREATE POLICY "Leaderboard is publicly readable" ON public.leaderboard FOR SELECT USING (true);

-- Anyone can insert (simple username-based system, no auth required)
CREATE POLICY "Anyone can insert into leaderboard" ON public.leaderboard FOR INSERT WITH CHECK (true);

-- Anyone can update (matched by username in app logic)
CREATE POLICY "Anyone can update leaderboard" ON public.leaderboard FOR UPDATE USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_leaderboard_updated_at
  BEFORE UPDATE ON public.leaderboard
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();