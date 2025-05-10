import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ChatScene from './scenes/ChatScene';
import CopyEmailScene from './scenes/CopyEmailScene';
import OpenGlimtScene from './scenes/OpenGlimtScene';
import SearchSessionScene from './scenes/SearchSessionScene';
import ViewReplayScene from './scenes/ViewReplayScene';
import CommentScene from './scenes/CommentScene';
import ShareScene from './scenes/ShareScene';
import RespondToUserScene from './scenes/RespondToUserScene';
import PostToSlackScene from './scenes/PostToSlackScene';

const scenes = [
  'chat',
  'copyEmail',
  'openGlimt',
  'searchSession',
  'viewReplay',
  'comment',
  'share',
  'respondToUser',
  'postToSlack',
];

export default function GlimtAnimation() {
  const [sceneIndex, setSceneIndex] = useState(0);

  // useEffect(() => {
  //   if (sceneIndex < scenes.length - 1) {
  //     const timer = setTimeout(() => setSceneIndex(i => i + 1), 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [sceneIndex]);

  return (
    <div className="w-screen h-screen bg-white text-black flex items-center justify-center">
      <AnimatePresence mode="wait">
        {scenes[sceneIndex] === 'chat' && <ChatScene />}
        {scenes[sceneIndex] === 'copyEmail' && <CopyEmailScene />}
        {scenes[sceneIndex] === 'openGlimt' && <OpenGlimtScene />}
        {scenes[sceneIndex] === 'searchSession' && <SearchSessionScene />}
        {scenes[sceneIndex] === 'viewReplay' && <ViewReplayScene />}
        {scenes[sceneIndex] === 'comment' && <CommentScene />}
        {scenes[sceneIndex] === 'share' && <ShareScene />}
        {scenes[sceneIndex] === 'respondToUser' && <RespondToUserScene />}
        {scenes[sceneIndex] === 'postToSlack' && <PostToSlackScene />}
      </AnimatePresence>
    </div>
  );
}
