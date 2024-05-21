const CalTime = (fullDate) => {
  //시간 계산해서 넣기
  //오늘 올라온거라면 n시간 전, n분 전 표시
  const nowDate = new Date();

  let finalDate;
  const day = fullDate.getDate();

  if (day === nowDate.getDate()) {
    const hour = fullDate.getHours();
    const minuet = fullDate.getMinutes();

    if (hour === nowDate.getHours()) {
      const diff = nowDate.getMinutes() - minuet;
      finalDate = diff + "분 전";
    } else {
      const diff = nowDate.getHours() - hour;
      finalDate = diff + "시간 전";
    }
  } else {
    // date의 getMonth 를 하면 현재의 달에 - 1 이 나오기 때문에 + 1 을 해줌
    finalDate = `${fullDate.getFullYear()}. 
                    ${fullDate.getMonth() + 1}.
                    ${fullDate.getDate()}.
                    ${fullDate.getHours()}.
                    ${fullDate.getMinutes()}`;
  }

  return finalDate;
};

export default CalTime;
