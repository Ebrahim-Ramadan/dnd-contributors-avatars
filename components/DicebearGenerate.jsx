'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const APIKEY='DWuPQkyvfLoCYe'
export const DicebearGenerate = () => {
  const [avatars, setAvatars] = useState([]);
  const [Prompt, setPrompt] = useState();

  useEffect(() => {

    const generateAvatars = async () => {
      try {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const avatarCount = Math.floor(Math.random() * (100 - 80 + 1)) + 80;
        const avatarData = Array.from({ length: avatarCount }, (_, index) => {
          const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
          const avatarUrl = `https://api.multiavatar.com/${randomCharacter}.png?apikey=${APIKEY}`;
          return { id: `avatar-${index}`, url: avatarUrl };
        });
        
        setAvatars(avatarData);
      } catch (error) {
        console.log(error);
      }
    }      

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
      const newPromptResult = `https://api.multiavatar.com/${Prompt}.png?apikey=${APIKEY}`;
      const newAvatar = { id: Math.floor(Math.random() * (100 - 50 + 1)) + 50, url: newPromptResult}
      setAvatars((prevAvatars) => [...prevAvatars, newAvatar]);
    }
    else {
      return
    }
    setPrompt('')
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
                    className='w-20 h-20 ml-[-20px] rounded-full cursor-grab border border-2 bg-gray-700 cursor-grap hover:opacity-20 transition-all duration-300 ease-in-out'
                  >
                    <Image alt='avatar' priority={false} width={80} height={80} src={avatar.url} />
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
