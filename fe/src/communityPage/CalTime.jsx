
const CalTime = (fullDate) => {
    //시간 계산해서 넣기
    //오늘 올라온거라면 n시간 전, n분 전 표시
    const nowDate = new Date();

    let finalDate;
    const day = fullDate.getDate();

        if(day === nowDate.getDate()){
            const hour = fullDate.getHours();
            const minuet = fullDate.getMinutes();
                    
            if(hour === nowDate.getHours()){
                const diff = nowDate.getMinutes() - minuet;
                finalDate = diff + "분 전"
            }
            else{
                const diff = nowDate.getHours() - hour;
                finalDate = diff + "시간 전"
            }
        }
        else{
            finalDate = fullDate.getFullYear() + "." 
                        + fullDate.getMonth() + "." 
                        + fullDate.getDate();
        }

        return finalDate;
}

export default CalTime;