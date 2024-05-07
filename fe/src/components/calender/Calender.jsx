import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths, differenceInWeeks } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import './_style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleProjectCalenderState } from '../../store/projectCalenderSlice';
import { changeScheduleModalState } from '../../store/addScheduleModalHandleSlice';

import styled from 'styled-components'

const IconBox = styled.div`
    transition: transform 0.3 ease;
    &:hover {
        transform: scale(1.2)
    }
`

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {

    const isDark = useSelector(state =>state.isDark.isDark)

    return (
        <div className="header row">
            <div className="col col-start" style={{color: `${isDark ? 'black' : 'white'}`}}>
                <span className="text">
                    <span className="text month">
                        {format(currentMonth, 'yyyy')}년
                    </span>
                    {'  '}{format(currentMonth, 'M')}월
                </span>
            </div>
            <div className="col col-end" style={{color: `${isDark ? 'black' : 'white'}`}}>
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} style={{ height: '1rem', color: `${isDark ? '#A8A8A8' : 'white'}` }} />
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} style={{ height: '1rem', color: `${isDark ? '#A8A8A8' : 'white'}` }} />
            </div>
        </div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

    const isDark = useSelector(state =>state.isDark.isDark)

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i} style={{backgroundColor: `${!isDark? 'white' : '#BAB2FF'}`}}>
                {date[i]}
            </div>,
        );
    }

    return <div className="days row">{days}</div>;
};


const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const totalWeeks = differenceInWeeks(endDate, startDate);
    const rowHeight = totalWeeks === 5 ? '13vh' : '15.4vh';
    
    const toDoList = useSelector(state => state.toDoList.value);
    
    const isDark = useSelector(state =>state.isDark.isDark)

    const dispatch = useDispatch()

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    };

    const fromatDated = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 만들기 위해 padStart 사용
        const day = date.getDate().toString().padStart(2, '0'); // 일도 두 자리로 만들기 위해 padStart 사용
        return `${month}.${day}`;
    }

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            days.push(
                <div
                    className={`col cell ${!isSameMonth(day, monthStart)
                        ? 'disabled'
                        : isSameDay(day, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(day, 'M')
                                ? 'not-valid'
                                : 'valid'
                        }`}
                    style={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                    key={day}
                    onClick={() => dispatch(changeScheduleModalState(true))}
                >
                    <span className={format(currentMonth, 'M') !== format(day, 'M') ? 'text not-valid' : ''}>
                        {formattedDate}
                    </span>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            width: '100%',
                            marginRight: '0.5rem',
                            marginBottom: '0.5rem',
                            overflow: 'auto',
                        }}
                    >
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {toDoList.map((item, index) => {
                                const itemStartDate = item.start ? new Date(item.start) : null;
                                const itemEndDate = item.end ? new Date(item.end) : null;
                                const today = new Date(day);

                                if (itemStartDate && itemEndDate) {
                                    if (itemStartDate <= today && today <= itemEndDate) {
                                        return (
                                            <OverlayTrigger
                                                key={index}
                                                placement="top"
                                                overlay={<Tooltip>
                                                    <div style={{ height: '100%', width: '100%' }}>
                                                        <div style={{ width: '100%', borderBottom: '2px solid #D1D1D1', color: '#D1D1D1', fontWeight: 'bold' }}>
                                                            {item.work}
                                                        </div>
                                                        <div style={{ width: '100%', borderBottom: '2px solid #D1D1D1', color: '#D1D1D1', fontWeight: 'bold' }}>
                                                            {item.worker}
                                                        </div>
                                                        <div>
                                                            <div>{fromatDated(new Date(item.start))} ~ {fromatDated(new Date(item.end))}</div>
                                                        </div>
                                                    </div>
                                                </Tooltip>}
                                            >
                                                {item.state ?
                                                    <div style={{ fontSize: '11px', backgroundColor: '#e8e6f4', borderRadius: '2rem', padding: '0 0.4rem', margin: '0.1rem 0.1rem', boxShadow: '1px 1px 1px 0px #564CAD', textDecoration: 'line-through' }}>
                                                        {truncate(item.work, 10)}
                                                    </div>
                                                    :
                                                    <div style={{ fontSize: '11px', backgroundColor: '#e8e6f4', borderRadius: '2rem', padding: '0 0.4rem', margin: '0.1rem 0.1rem', boxShadow: '1px 1px 1px 0px #564CAD' }}>
                                                        {truncate(item.work, 10)}
                                                    </div>
                                                }
                                            </OverlayTrigger>
                                        );
                                    } else {
                                        return null;
                                    }
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                    </div>
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" style={{ height: rowHeight, backgroundColor: `${isDark ? 'white' : '#F1F1F1'}` }} key={day}>
                {days}
            </div>
        );
        days = [];
    }
    return <div className="body" style={{ height: '100%' }}>{rows}</div>;
};

export const Calender = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const isDark = useSelector(state =>state.isDark.isDark)

    const dispatch = useDispatch();

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        setSelectedDate(day);
    };

    useEffect(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }, []);

    return (
        <div className="calendar" style={{ height: '100%', width: '100%', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: `${isDark ? 'white' : '#404040'}` }}>
            <IconBox style={{ display: 'flex', color: `${isDark ? '#564CAD' : 'white'}`, width: '100%', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faTimesCircle} style={{ cursor: 'pointer' }} onClick={() => dispatch(toggleProjectCalenderState())} />
            </IconBox>
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
            />
        </div>
    );
};
