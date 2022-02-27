import React from 'react'
import {Card,CardContent,Typography} from '@material-ui/core';
import CountUp from 'react-countup';
function InfoBox({title,cases,total}) {
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography separator=",">{title}</Typography>
                    <h1>+<CountUp
                  start={0}
                  end={cases}
                  duration={1}
                  separator=","
                /></h1>
                    <Typography separator=",">{total}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox
