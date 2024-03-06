import React, { useState } from 'react';
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';

function RandomAvatar() {
  const [svg, setSvg] = useState('');

  // 랜덤 아바타 생성 및 설정
  const generateRandomAvatar = () => {
    const newAvatar = createAvatar(bigSmile, {
      seed: Math.random().toString(),
    }).toString();

    setSvg(newAvatar);
  };

  return (
    <div>
      <h1>Random Avatar</h1>
      <button type="submit" onClick={generateRandomAvatar}>
        Generate Random Avatar
      </button>
      {svg && (
        <img
          src={`data:image/svg+xml;base64,${btoa(svg)}`}
          alt="Random Avatar"
        />
      )}
    </div>
  );
}

export default RandomAvatar;
