import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import styled from "styled-components";

const data = [
    {
        year: 2023,
        done: 8,
        not_done: 2,
        date: "23-10-2023", // October 23, 2023
    },
    {
        year: 2023,
        done: 5,
        not_done: 0,
        date: "24-10-2023", // October 24, 2023
    },
    {
        year: 2023,
        done: 7,
        not_done: 3,
        date: "25-10-2023", // October 25, 2023
    },
    {
        year: 2023,
        done: 9,
        not_done: 1,
        date: "26-10-2023", // October 26, 2023
    },
    {
        year: 2023,
        done: 4,
        not_done: 5,
        date: "27-10-2023", // October 27, 2023
    },
    {
        year: 2023,
        done: 6,
        not_done: 0,
        date: "28-10-2023", // October 28, 2023
    },
    {
        year: 2023,
        done: 10,
        not_done: 1,
        date: "29-10-2023", // October 29, 2023
    },
    {
        year: 2023,
        done: 3,
        not_done: 2,
        date: "30-10-2023", // October 30, 2023
    },
    {
        year: 2023,
        done: 7,
        not_done: 0,
        date: "31-10-2023", // October 31, 2023
    },
    {
        year: 2023,
        done: 5,
        not_done: 3,
        date: "1-11-2023", // November 1, 2023
    },
    {
        year: 2023,
        done: 8,
        not_done: 1,
        date: "2-11-2023", // November 2, 2023
    },
    {
        year: 2023,
        done: 6,
        not_done: 2,
        date: "3-11-2023", // November 3, 2023
    },
    {
        year: 2023,
        done: 9,
        not_done: 0,
        date: "4-11-2023", // November 4, 2023
    },
    {
        year: 2024,
        done: 5,
        not_done: 0,
        date: "1-1-2024", // January 1, 2024
    },
    {
        year: 2024,
        done: 12,
        not_done: 1,
        date: "15-3-2024", // March 15, 2024
    },
    {
        year: 2024,
        done: 8,
        not_done: 3,
        date: "10-6-2024", // June 10, 2024
    },
    {
        year: 2024,
        done: 7,
        not_done: 2,
        date: "20-9-2024", // September 20, 2024
    },
    {
        year: 2024,
        done: 9,
        not_done: 1,
        date: "1-10-2024", // October 1, 2024
    },
    {
        year: 2024,
        done: 10,
        not_done: 0,
        date: "10-10-2024", // October 10, 2024
    },
    {
        year: 2024,
        done: 6,
        not_done: 3,
        date: "13-10-2024", // October 13, 2024 (current date)
    },
];

const Grid = styled.td`
    display: grid;
    grid-template-rows: repeat(7, 15px);
    grid-template-columns: repeat(4, 15px);
    grid-auto-flow: column;
    gap: 8.8px;
    width: 100%;
`;

const Day = styled.tr`
    width: 15px;
    height: 15px;
    margin-top: 5px;
    border-radius: 3px;
    background-color: ${(props) => props.color || "#ebedf0"};
`;

const StreakContainer = styled.table`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const MonthLabelContainer = styled.tr`
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 10px;
`;

const MonthLabel = styled.td`
    font-size: 15px;
    color: #666;
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
    display: flex;
    justify-content: center;
`;

export function Calender() {
    const getColor = (activeColor) => {
        switch (true) {
            case activeColor >= highestActivity - 1:
                return "#216e39"; // Highest activity level
            case activeColor >= highestActivity - 5 && activeColor <= highestActivity - 2:
                return "#30a14e";
            case activeColor >= highestActivity - 8 && activeColor <= highestActivity - 6:
                return "#40c463";
            case activeColor >= 1 && activeColor <= highestActivity - 9:
                return "#9be9a8"; // Lowest activity level
            default:
                return "#ebedf0";
        }
    };

    const name = (item) => {
        switch (item) {
            case 1:
                return "Jan";
            case 2:
                return "Feb";
            case 3:
                return "Mar";
            case 4:
                return "Apr";
            case 5:
                return "May";
            case 6:
                return "Jun";
            case 7:
                return "Jul";
            case 8:
                return "Aug";
            case 9:
                return "Sep";
            case 10:
                return "Oct";
            case 11:
                return "Nov";
            case 12:
                return "Dec";
        }
    };
    const [fullYear, setFullYear] = useState([]);
    const [month, setMonth] = useState([]);
    const [highestActivity, setHighestActivity] = useState(0);

    useEffect(() => {
        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        const monthHeading = [];

        const dates = [];
        let currentDate = new Date();

        if (oneYearAgo.getDay() === 0) {
            currentDate = oneYearAgo;
        } else {
            let i = 0;
            while (i < 7) {
                oneYearAgo.setDate(oneYearAgo.getDate() - 1);
                if (oneYearAgo.getDay() === 0) {
                    currentDate = oneYearAgo;
                    break;
                }
            }
        }
        while (currentDate <= today) {
            dates.push(currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear());
            !monthHeading.includes(currentDate.getMonth() + 1) && monthHeading.push(currentDate.getMonth() + 1);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        if (today.getDate() >= 10 && today.getDay() === 0) {
            monthHeading.push(today.getMonth() + 1);
        }

        if (oneYearAgo.getDate() >= 15 && oneYearAgo.getDay() > 0) {
            monthHeading.shift();
        }
        setFullYear(dates);
        setMonth(monthHeading);
        setHighestActivity(Math.max(...data.map(activity => activity.done)));

    }, []);

    return (
        <Container>
            <StreakContainer>
                <MonthLabelContainer>
                    {month.reverse().map((item, index) => (
                        <MonthLabel key={index}>{name(item)}</MonthLabel>
                    ))}
                </MonthLabelContainer>
                <Grid>
                    {fullYear.map((day, index) => (
                        <Day key={index} title={`${day} ,  ${data.find(item => (item.date === day))?.done ? (data.find(item => (item.date === day))?.done === 1 ? data.find(item => (item.date === day))?.done + " contribution" : data.find(item => (item.date === day))?.done + " contributions") : "No Contribution"}`} color={getColor(data.find(item => (item.date === day))?.done)}></Day>
                    ))}
                </Grid>
            </StreakContainer>
        </Container>
    );
}

