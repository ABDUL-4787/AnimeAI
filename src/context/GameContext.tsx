import React, { createContext, useContext, useState, useEffect } from 'react';
import { sound } from '../utils/audio';

export interface Character {
  name: string;
  hair: string;
  outfit: string;
  companion: string;
}

export interface GameState {
  character: Character | null;
  level: number;
  xp: number;
  xpNeeded: number;
  coins: number;
  streak: number;
  lastActive: string | null;
  completedQuests: string[];
  currentQuestId: string;
}

interface GameContextType {
  state: GameState;
  saveCharacter: (char: Character) => void;
  completeQuest: (questId: string, xpReward: number, coinsReward: number) => void;
  setCurrentQuest: (questId: string) => void;
  resetGame: () => void;
  addCoins: (amount: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const xpNeededForLevel = (lvl: number): number => {
  return lvl * 100; // e.g. Level 1 needs 100xp, Level 2 needs 200xp, Level 3 needs 300xp...
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem('animeai_save_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse save state, initializing default state", e);
      }
    }
    return {
      character: null,
      level: 1,
      xp: 0,
      xpNeeded: 100,
      coins: 0,
      streak: 0,
      lastActive: null,
      completedQuests: [],
      currentQuestId: 'variables',
    };
  });

  // Save state to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('animeai_save_state', JSON.stringify(state));
  }, [state]);

  // Streak verification on load
  useEffect(() => {
    const today = new Date().toDateString();
    if (state.lastActive && state.lastActive !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      if (state.lastActive === yesterdayStr) {
        // Keep streak and update active date
        setState(prev => ({ ...prev, lastActive: today }));
      } else {
        // Broke streak (inactive for more than 1 day)
        setState(prev => ({ ...prev, streak: 0, lastActive: today }));
      }
    } else if (!state.lastActive) {
      setState(prev => ({ ...prev, lastActive: today }));
    }
  }, []);

  const saveCharacter = (char: Character) => {
    sound.playClick();
    setState(prev => ({
      ...prev,
      character: char,
      streak: prev.streak === 0 ? 1 : prev.streak, // start streak on character creation
    }));
  };

  const completeQuest = (questId: string, xpReward: number, coinsReward: number) => {
    setState(prev => {
      // Avoid duplicate quest completion reward trigger
      const isAlreadyCompleted = prev.completedQuests.includes(questId);
      const updatedQuests = isAlreadyCompleted 
        ? prev.completedQuests 
        : [...prev.completedQuests, questId];

      let newXp = prev.xp + (isAlreadyCompleted ? 0 : xpReward);
      let newLevel = prev.level;
      let newXpNeeded = prev.xpNeeded;
      let leveledUp = false;

      // Handle leveling up
      while (newXp >= newXpNeeded) {
        newXp -= newXpNeeded;
        newLevel += 1;
        newXpNeeded = xpNeededForLevel(newLevel);
        leveledUp = true;
      }

      if (leveledUp) {
        setTimeout(() => {
          sound.playLevelUp();
        }, 800);
      } else {
        sound.playSuccess();
      }

      // Update streak active date to today
      const today = new Date().toDateString();
      let newStreak = prev.streak;
      if (prev.lastActive !== today) {
        newStreak += 1;
      }

      // Determine next quest
      const questsList = ['variables', 'datatypes', 'io', 'conditions', 'loops', 'functions', 'lists', 'tuples', 'sets', 'dictionary', 'files', 'oop'];
      const currentIdx = questsList.indexOf(questId);
      let nextQuestId = prev.currentQuestId;
      if (currentIdx !== -1 && currentIdx < questsList.length - 1) {
        nextQuestId = questsList[currentIdx + 1];
      }

      return {
        ...prev,
        completedQuests: updatedQuests,
        xp: newXp,
        level: newLevel,
        xpNeeded: newXpNeeded,
        coins: prev.coins + (isAlreadyCompleted ? 0 : coinsReward),
        streak: newStreak,
        lastActive: today,
        currentQuestId: nextQuestId
      };
    });
  };

  const setCurrentQuest = (questId: string) => {
    setState(prev => ({ ...prev, currentQuestId: questId }));
  };

  const addCoins = (amount: number) => {
    setState(prev => ({ ...prev, coins: prev.coins + amount }));
  };

  const resetGame = () => {
    sound.playClick();
    setState({
      character: null,
      level: 1,
      xp: 0,
      xpNeeded: 100,
      coins: 0,
      streak: 0,
      lastActive: null,
      completedQuests: [],
      currentQuestId: 'variables',
    });
    localStorage.removeItem('animeai_save_state');
  };

  return (
    <GameContext.Provider value={{ state, saveCharacter, completeQuest, setCurrentQuest, resetGame, addCoins }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
