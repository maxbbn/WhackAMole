'use client';
import React, { useState, useEffect } from 'react';

import styles from './whack.module.css';

// 创建打地鼠游戏组件
const WhackAMole: React.FC = () => {
  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState<boolean[]>([]);
  const [difficulty, setDifficulty] = useState(1);

  // 初始化地鼠位置
  useEffect(() => {
    const initialMoles = Array(9).fill(false);
    setMoles(initialMoles);
  }, []);

  // 随机生成地鼠
  useEffect(() => {
    const moleTimer = setInterval(() => {
      const moleIndex = Math.floor(Math.random() * 9);
      const newMoles = [...moles];
      newMoles[moleIndex] = !newMoles[moleIndex];
      setMoles(newMoles);
    }, 1000 / difficulty);

    return () => clearInterval(moleTimer);
  }, [moles, difficulty]);

  // 点击地鼠
  const handleClick = (index: number) => {
    if (moles[index]) {
      setScore(score + 1);
      const newMoles = [...moles];
      newMoles[index] = false;
      setMoles(newMoles);
    }
  };

  // 调整难度
  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <h1>打地鼠</h1>
      <label htmlFor="difficulty">难度:</label>
      <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
        <option value={1}>简单</option>
        <option value={2}>中等</option>
        <option value={3}>困难</option>
      </select>
      <p>得分: {score}</p>
      <div className={styles.gameBoard}>
        {moles.map((mole, index) => (
          <button
            className={`${styles.mole} ${mole ? styles.active : ''}`}
            key={index}
            onClick={() => handleClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default WhackAMole;
