import React, { useCallback, useEffect, useState } from 'react';
import Chart from 'chart.js';
import { Col, Row } from 'reactstrap';
import moment from 'moment-with-locales-es6';
import { capitalizeFirstLetter } from 'function/capitalizeFisrtWord';

const SummaryGraphic = ({
    data,
    loading
}) => {
    const [labels, setLabels] = useState([""])
    const [totalHours, setTotalHours] = useState([0])
    const [totalAmount, setTotalAmount] = useState([0])

    const generateGraphicHours = useCallback(() => {
        let canvasElement = document.createElement("canvas")
        canvasElement.id = "myChart"
        document.getElementById("myChart").remove()
        document.getElementById("container-canvas").appendChild(canvasElement)
        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total de Hs.',
                        data: totalHours,
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, [labels, totalHours])


    const generateGraphicAmount = useCallback(() => {
        let canvasElement = document.createElement("canvas")
        canvasElement.id = "myChart2"
        document.getElementById("myChart2").remove()
        document.getElementById("container-canvas2").appendChild(canvasElement)
        const ctx = document.getElementById('myChart2');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Monto en $',
                        data: totalAmount,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, [labels, totalAmount])

    useEffect(() => {
        if (totalHours.length > 0 && labels.length > 0) {
            generateGraphicHours()
        }
        if (totalAmount.length > 0 && labels.length > 0) {
            generateGraphicAmount()
        }
    }, [totalAmount, totalHours, labels, generateGraphicHours, generateGraphicAmount])

    useEffect(() => {
        let tAmount = []
        let tHours = []
        let periods = []

        if (data.length > 0) {
            // eslint-disable-next-line
            data.map((item, key) => {
                const amount = item.totalAmount
                const hours = item.totalHours
                const period = moment(`${item.year}-${item.month}-01`, "YYYY-MM-DD").toDate()
                const periodStr = `${capitalizeFirstLetter(moment(period).locale("es").format("MMMM"))}/${moment(period).format("YYYY")}`

                tAmount.push(amount)
                tHours.push(hours)
                periods.push(periodStr)

                if (key === data.length - 1) {
                    setTotalAmount(tAmount)
                    setTotalHours(tHours)
                    setLabels(periods)
                }
            })
        } else {
            setTotalAmount([0])
            setTotalHours([0])
            setLabels([""])
        }
    }, [data])


    return (
        <>
            <Row className={loading ? "shimmer" : ""} >
                <Col md="12" id="container-canvas" >
                    <canvas id="myChart" width={"150px"} style={{ width: "100%", maxHeight: "150px" }} ></canvas>
                </Col>
            </Row>
            <Row >
                <Col md="12" id="container-canvas2">
                    <canvas id="myChart2" style={{ width: "100%", maxHeight: "150px" }} ></canvas>
                </Col>
            </Row>
        </>
    )
}

export default SummaryGraphic