# Audio Player Implementation Plan

This document outlines the process for implementing a functional and modern audio player within the application, using `react-native-track-player`.

## Step 1: Installation and Setup

1.  **Install the library:** Add the `react-native-track-player` dependency to the project's `package.json`.
2.  **Configure for iOS & Android:** The library requires some native configuration.
    *   Add a `swift` file to the `ios` directory to enable Swift support.
    *   Update the `Info.plist` on iOS to allow background audio.
    *   Create a `service.js` file to handle background playback logic. This service is essential for allowing the audio to continue playing when the app is in the background.

## Step 2: Service and Player Initialization

1.  **Create the Playback Service:** Create a `service.js` file. This file will register the playback service and contain the logic for handling remote events like play, pause, skip, etc., which come from the lock screen or notification controls.
2.  **Initialize the Player:** In a central part of the app (like the root layout or a provider), use a `useEffect` hook to initialize the track player once. This involves setting up the player with its initial options and registering the playback service. This only needs to be done once when the app starts.

## Step 3: Implementing the PlayerScreen Component

1.  **State Management with Hooks:** `react-native-track-player` provides hooks that make state management much simpler. We will use:
    *   `usePlaybackState()` to get the current state of the player (e.g., `State.Playing`, `State.Paused`, `State.Buffering`). This will be used to update the UI, such as showing a play or pause icon.
    *   `useProgress()` to get the live playback position, duration, and buffered position. This hook is highly optimized and will be used to update the slider and time-stamp texts without causing performance issues.

2.  **Adding Tracks:** When the `PlayerScreen` component mounts, a `useEffect` hook will be used to set up the player for the specific track. This involves:
    *   Calling `TrackPlayer.reset()` to clear any previous tracks.
    *   Calling `TrackPlayer.add()` to add the new track to the queue. The track object will include the `url` (from the navigation params), `title`, `artist` (which can be the app name), and `artwork` (the story's image).

3.  **Controlling Playback:**
    *   **Play/Pause:** The play/pause button will call `TrackPlayer.play()` or `TrackPlayer.pause()`. The `usePlaybackState` hook will automatically update the UI.
    *   **Seek/Scrub:** The `Slider` component's `onSlidingComplete` event will call `TrackPlayer.seekTo()` with the new position. The `useProgress` hook will keep the slider's position updated during playback.
    *   **Forward/Replay:** The forward and replay buttons will also use `TrackPlayer.seekTo()` by getting the current position from the `useProgress` hook and adding or subtracting the desired time.

4.  **Component Cleanup:** A `useEffect` cleanup function will be used to reset the player (`TrackPlayer.reset()`) when the `PlayerScreen` is unmounted. This is important to ensure that the audio stops and resources are cleared when the user navigates away from the screen.
