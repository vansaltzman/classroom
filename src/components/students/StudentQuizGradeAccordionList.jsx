import React from 'react';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Headline from 'grommet/components/Headline';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Status from 'grommet/components/icons/Status';
import Value from 'grommet/components/Value';



class IndividualQuizGradeAccordion extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Section pad='small' justify='center'align='center'>
            <Section pad='small' justify='center'align='center'>

                    
            <div style={{width:'60%', align:'center'}} >
           
                <Box full='horizontal' >
                <Accordion openMulti={false} >

                {this.props.quizGrades.map((quiz, i) => {
                    let quizGradeValue = this.props.calculateQuizGrade(quiz.responses);
                    let colorIndex = this.props.colorIndex(quizGradeValue)
                    let quizGradeComponent = <Value 
                                                value={quizGradeValue}
                                                colorIndex={colorIndex}
                                                units='%'
                                            />
                    return (
                    <AccordionPanel key={quiz.id} 
                    heading={    
                        <Box
                            direction="row"
                            full='horizontal'
                            margin="small"
                            alignContent="stretch"
                            justify='between'
                            > 
                                    <Box
                                        direction="column"
                                        justify="start"
                                        alignContent="between"
                                        style={{width: '400px', maxWidth: '720px'}}
                                        style={{marginRight: 'auto'}}
                                    >
                                    <Heading  tag='h3' >
                                        {quiz.name}
                                    </Heading>
                                    </Box>
                                    <Box
                                        direction="column"
                                        justify="center"
                                        style={{width: '298px'}}
                                        style={{margin: '0 50px 0 50px'}}
                                    >
                                    <Heading  tag='h3' >
                                        Weight:  {quiz.weight}%
                                    </Heading>
                                    </Box>
                                    <Box
                                        direction="column"
                                        justify="end"
                                        alignContent="center"
                                        style={{width: '298px'}}
                                        style={{marginRight: '30px'}}
                                    >
                                    <Heading  tag='h3'  >
                                        Grade: {quizGradeComponent}
                                    </Heading>

                                </Box>
                            </Box>
                            //heading ends here
                    } >
                    <Section pad='small' justify='center'align='center'>
                    
                    {quiz.questions.map((question, i) => {

                        return (
                        <Box direction='row' full='horizontal' alignContent='between' style={{marginBottom:'50px'}} >
                          <div style={{ width:'300px', height:'50px', textAlign:'center'}}>
                                { quiz.responses[question.id] && !quiz.responses[question.id].correct ? 
                                    <Status value='critical' size='medium' style={{paddingLeft:'30px'}} /> 
                                    : <Status value='ok' size='medium' style={{paddingLeft:'30px'}} />
                                }
                                
                            </div>
                            <Box direction='column' full='horizontal' justify='center'>
                                <Heading tag='h3'  >
                                    {question.text}
                                </Heading>
                            
                            
                            <div style={{width:'70%', align:'center'}}>
                            <List>

                                {Object.keys(question.answers).map((answerId, i)=>{
                                    let isCorrect = question.answers[answerId].isCorrect;
                                    let studentAnswerId = quiz.responses[question.id].responseId;
                                    var marker;
                                    if (studentAnswerId === parseInt(answerId) && !isCorrect) {
                                        marker = <Status value='critical' style={{marginRight:'10px'}} />
                                    }
                                    else if (isCorrect) {
                                        marker = <Status value='ok' style={{marginRight:'10px'}} />
                                    } else {
                                        marker = <div style={{width:'34px', align:'center'}} > </div>
                                    }
                                    return (<ListItem key={i} separator='horizontal' >
                                        <Box direction='row'>
                                        {marker} {i+1}) <div style={{marginLeft:'7px'}}> {question.answers[answerId].text} </div>
                                        </Box>
                                    </ListItem> )
                                })}

                            </List>
                            </div>
                            </Box>

                        </Box>
                        )
                        } ) }
                        
                        </Section>
                    </AccordionPanel>
                        )
                    } )}

                </Accordion>

                </Box> 
            </div>

            </Section>        
            </Section>
        )
    }
}
export default IndividualQuizGradeAccordion;
