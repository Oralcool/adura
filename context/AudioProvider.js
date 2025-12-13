import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  
  // The player is initialized without a source
  const player = useAudioPlayer(null, {
    staysActiveInBackground: true,
  });
  const status = useAudioPlayerStatus(player);

  const toggleMute = () => {
    if (player) {
      player.muted = !player.muted;
    }
  };

  const loadTrack = (track) => {
    setCurrentTrack(track);
    if (track && track.audio) {
      player.replace(track.audio);
      player.play();
    }
  };

  const unloadTrack = () => {
    player.pause();
    setCurrentTrack(null);
  };

  const value = {
    player,
    status,
    currentTrack,
    loadTrack,
    unloadTrack,
    toggleMute,
    isMuted: player.muted,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  return useContext(AudioContext);
};
