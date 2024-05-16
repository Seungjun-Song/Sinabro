import React, { useState, useEffect } from "react";

function CountingComponent({ targetNum }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = Math.max(1, Math.ceil(targetNum / 500)); // 증가분을 작게 설정
    const counting = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount + increment >= targetNum) {
          clearInterval(counting); // 인터벌 정지
          return targetNum; // 타겟 숫자에 도달
        }
        return prevCount + increment; // 증가분을 더함
      });
    }, 30);

    return () => clearInterval(counting); // 컴포넌트 언마운트 시 인터벌 정리
  }, [targetNum]); // targetNum이 변경될 때마다 이펙트 재실행

  const getColor = (value) => {
    if (value <= 20) {
      return "#df7878"; // 빨간색
    } else if (value <= 40) {
      return "orange"; // 주황색
    } else if (value <= 60) {
      return "#e1d76b"; // 노란색
    } else if (value <= 80) {
      return "#93c65c"; // 초록색
    } else {
      return "#78a3df"; // 파란색
    }
  };

  return (
    <div id="count">
      <p
        style={{
          fontSize: "55px",
          fontFamily: "YeongdeokSnowCrab",
          color: getColor(count), // 동적으로 색상 결정
          marginRight: "10px",
          marginLeft: "20px",
        }}
      >
        {new Intl.NumberFormat().format(count)}%
      </p>
    </div>
  );
}

export default CountingComponent;
