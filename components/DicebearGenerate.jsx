'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import sillyJOJI from '@/public/silltJOJI.png'
export const DicebearGenerate = () => {
  const [avatars, setAvatars] = useState([]);
  const [Prompt, setPrompt] = useState();

  useEffect(() => {

    const generateAvatars = async () => {
      try {
        const avatarCount = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
        const avatarData = Array.from({ length: avatarCount }, (_, index) => {
          const randomNumber = Math.floor(Math.random() * 1000); // generate a random number between 0 and 1000 with randomized count of max length so the user can have absolute maximum randomniess (not a total mess)
          const avatarUrl = `https://robohash.org/${randomNumber}.png`;
          return { id: `avatar-${index}`, url: avatarUrl };
          })
        
        setAvatars(avatarData);
      } catch (error) {
        console.log(error);
      }
    };

    generateAvatars();
  }, []);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(avatars);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAvatars(items);
  }


  const appendNewAvatars = () => {
    if (Prompt && Prompt != '') {
      const newPromptResult = `https://robohash.org/${Prompt}`;
      const newAvatar = { id: Math.floor(Math.random() * (100 - 50 + 1)) + 50, url: newPromptResult}
      setAvatars((prevAvatars) => [...prevAvatars, newAvatar]);
    }
    else {
      return
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      appendNewAvatars();
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className='text-center'><a> get your contributers to the top</a>
      <br />
      find two similar aliens and <a href='https://github.com/Ebrahim-Ramadan/dnd-contributors-avatars' className='font-bold transition-all duration-300 ease-in-out text-sky-400 hover:text-sky-700 ' target='_blank'>report here</a></div>
     
      <Droppable droppableId="avatars" direction="horizontal">
        {(provided) => (
          <div
            className='flex flex-wrap max-w-full justify-center'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {avatars.map((avatar, index) => (
              <Draggable key={avatar.id} draggableId={avatar.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ ...provided.draggableProps.style }}
                    className='w-20 h-20 ml-[-20px] rounded-full cursor-grab border border-2 bg-gray-700 cursor-pointer hover:opacity-20 transition-all duration-300 ease-in-out'
                  >
                    <Image alt='avatar' priority={false} width={70} height={70} src={avatar.url?avatar.url:sillyJOJI} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className='p-8'><input placeholder='wtf is your prompt?' className='bg-transparent outline-none border-none' onKeyDown={handleKeyPress} onChange={(e) => setPrompt(e.target.value)}/> <button onClick={appendNewAvatars}>prompt</button></div>
    </DragDropContext>
  );
};