'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const DicebearGenerate = () => {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const contributors = [];
    const roboHashBaseUrl = 'https://robohash.org/';

    for (let i = 1; i <= 100; i++) {
      contributors.push(`contributer${i}`);
    }

    const generateAvatars = async () => {
      try {
        const avatarData = await Promise.all(
          contributors.map(async (contributor, index) => {
            const avatarUrl = `${roboHashBaseUrl}${contributor}.png`;
            return { id: `avatar-${index}`, url: avatarUrl };
          })
        );
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

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
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
                    <Image alt='avatar' priority={false} width={70} height={70} src={avatar.url} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
