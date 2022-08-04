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
    const [totalAmount, setTotalAmount] = useState([0])

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
                        label: 'Pagos en $',
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
        if (totalAmount.length > 0 && labels.length > 0) {
            generateGraphicAmount()
        }
    }, [totalAmount, labels, generateGraphicAmount])

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
                    setLabels(periods)
                }
            })
        } else {
            setTotalAmount([0])
            setLabels([""])
        }
    }, [data])


    return (
        <>
            <Row >
                <Col md="12" id="container-canvas2">
                    <canvas id="myChart2" style={{ width: "100%", maxHeight: "150px" }} ></canvas>
                </Col>
            </Row>
        </>
    )
}

export default SummaryGraphic