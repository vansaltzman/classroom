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
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';


class IndividualQuizGradeAccordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.calculateQuizGrade = this.calculateQuizGrade.bind(this);
        this.calculateCurrentClassGrade = this.calculateCurrentClassGrade.bind(this);
    }
    calculateQuizGrade(responsesObj) {
        let numberOfQuestions = Object.keys(responsesObj).length;
        let totalCorrect = 0;
        for (var response in responsesObj) {
            if (responsesObj[response].correct) totalCorrect++
        }
        return Math.round(totalCorrect/numberOfQuestions * 100)
    }
    calculateCurrentClassGrade(quizData) {
        let totalPoints = quizData.reduce( (acc, quiz) => {
            return acc + this.calculateQuizGrade(quiz.responses)*quiz.weight
        }, 0);
        let potentialPoints = quizData.reduce((acc, quiz) => {
            return acc + quiz.weight*100;
        },0)
        return Math.round(totalPoints/potentialPoints *100);
    }

    render() {
        console.log('this.props.quizdata ', this.props.quizData);
        let classGrade;
        let classGradeColorIndex;
        if (this.props.quizData.length) {
            classGrade = this.calculateCurrentClassGrade(this.props.quizData);
            console.log('classgrade ', classGrade);
            if (classGrade <= 66) {
                classGradeColorIndex = 'accent-1'
            } else if (classGrade >66 && classGrade <= 75) {
                classGradeColorIndex ='accent-2'
            } else {
                classGradeColorIndex='neutral-1'
            }
        }
        return (
            <Section pad='small' justify='center'align='center'>
            <Section pad='small' justify='center'align='center'>

                <Headline margin='medium' size='small'>
                    Quiz Grades
                </Headline>
                    
            <div style={{width:'60%', align:'center'}} >
           
                <Box full='horizontal' >
                <Accordion openMulti={false} >

                {this.props.quizData.map((quiz, i) => {
                    let quizGradeValue = this.calculateQuizGrade(quiz.responses);
                    let colorIndex;
                    if (quizGradeValue <= 66) {
                        colorIndex = 'accent-1'
                    } else if (quizGradeValue >66 && quizGradeValue <= 75) {
                        colorIndex ='accent-2'
                    } else {
                        colorIndex='neutral-1'
                    }
                    let quizGradeComponent = <Value 
                                                value={quizGradeValue}
                                                colorIndex={colorIndex}
                                                units='%'
                                                />
                    console.log('quiz in accordion view ', quiz);
                    return (
                    <AccordionPanel 
                        key={quiz.id} 
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
                          <div style={{ width:'300px', height:'50px', align:'center'}}>
                            {console.log('quiz where property not defined ', quiz)}
                            {console.log('question where property not defined ', question)}
                                { quiz.responses[question.id] && !quiz.responses[question.id].correct ? 
                                    <Status value='critical' size='medium' style={{paddingLeft:'30px'}} /> 
                                    : <Status value='ok' size='medium' style={{paddingLeft:'30px'}} />
                                }
                                
                            </div>
                            {/* <div key={i} style={{width:'70%', align:'center'}}> */}
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
                                        {marker}    {i+1}) {question.answers[answerId].text}
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
                    {classGrade? <Headline margin='medium' size='small'>
                        Current class grade: <Value 
                                                value={classGrade}
                                                colorIndex={classGradeColorIndex}
                                                units='%'
                                                />
                    </Headline> : <div></div>}
               
            </Section>        
            </Section>
        )
    }
}
export default IndividualQuizGradeAccordion;
