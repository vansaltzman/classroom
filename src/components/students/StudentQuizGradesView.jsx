import React from 'react';
import StudentQuizGradeAccordionList from './StudentQuizGradeAccordionList.jsx';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';
import Button from "grommet/components/Button";
import Value from 'grommet/components/Value';
import LikeIcon from 'grommet/components/icons/base/Like';
import Anchor from "grommet/components/Anchor";
import Box from "grommet/components/Box";
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';

class StudentQuizGradesView extends React.Component {
    constructor(props) {
        super(props);
        this.calculateQuizGrade = this.calculateQuizGrade.bind(this);
        this.calculateCurrentClassGrade = this.calculateCurrentClassGrade.bind(this);
        this.calculateParticipationRanking = this.calculateParticipationRanking.bind(this);
    }
    componentDidMount() {
        this.props.getQuizDataForStudentInClass({
            studentId: this.props.studentId,
            classId: this.props.targetClass.id
        })
        this.props.getParticipationData({
            classId: this.props.targetClass.id
        })
    }
    calculateQuizGrade(responsesObj) {
        let numberOfQuestions = Object.keys(responsesObj).length;
        let totalCorrect = 0;
        for (var response in responsesObj) {
            if (responsesObj[response].correct) totalCorrect++
        }
        return Math.round(totalCorrect/numberOfQuestions * 100)
    }
    calculateCurrentClassGrade(quizGrades) {
        let totalPoints = quizGrades.reduce( (acc, quiz) => {
            return acc + this.calculateQuizGrade(quiz.responses)*quiz.weight
            }, 0);
        let potentialPoints = quizGrades.reduce((acc, quiz) => {
            return acc + quiz.weight*100;
            },0)
        return Math.round(totalPoints/potentialPoints *100);
    }

    calculateParticipationRanking(participationData) {
        let studentId = this.props.studentId;
        let sorted = participationData.sort((a, b) => a.participation - b.participation);
        let studentRanking = sorted.map(student => student.student_id).indexOf(studentId) + 1;
        return studentRanking/participationData.length;
    }

    colorIndex(numZeroToHundred) {
        if (numZeroToHundred < 60) {
            return 'critical'
        } 
        else if (numZeroToHundred >=60 && numZeroToHundred < 75) {
            return 'warning'
        } 
        else {
            return 'ok'
        }
    }

    render() {
        let className = this.props.targetClass.name;
        let classId = this.props.targetClass.id;
        let classGrade;
        let quizGrades;
        let participationData;
        if (this.props.quizGrades && this.props.participationData) {
            quizGrades = this.props.quizGrades;
            classGrade = this.calculateCurrentClassGrade(this.props.quizGrades);
            var classGradeColorIndex = this.colorIndex(classGrade)
            participationData = this.props.participationData;
            var participationRank = this.calculateParticipationRanking(this.props.participationData);
            var participationColorIndex=this.colorIndex(participationRank*100)
            
        } else {
            quizGrades = [];
            participationData = [];
        }
   
        return (
            <div>
                <Article>
                    <Section 
                        pad='small'
                        justify='between'
                        style={{background:'#bcd8f2'}}
                        align='center'
                        direction="row"
                    >

                        {this.props.targetClass.isLive ?
                        <Anchor 
                            icon={<LinkPreviousIcon size="large" />}
                            label='Go Back'
                            primary={false}
                            style={{lineHeight: '100px', marginLeft: "10px"}}
                            onClick={this.props.toggleGrades}
                        /> : 
                        <div style={{width: '100px'}}>
                            {' '}
                        </div>
                        }
                        <Headline margin='medium' size='medium'>
                            {className}
                        </Headline>
                        <div style={{width: '100px'}}>
                            {' '}
                        </div>

                    </Section>

                    <Section pad='small' justify='center' align='center'>
                        {classGrade ? 
                        <div> <Box direction='row' align='baseline'>

                            <Headline margin='medium' size='small'>
                            Current class grade: <Value value={classGrade} 
                                                    colorIndex={classGradeColorIndex}
                                                    units='%' />
                            </Headline> 

                            <span style={{width:'100px'}} ></span>

                            <Headline margin='medium' size='small'>
                                Participation: <LikeIcon type='status'size='large'
                                                    style={{transform:`rotate(${180+(participationRank*180) }deg)`}}
                                                    colorIndex={participationColorIndex} />
                            </Headline> 
                            
                        </Box></div>
                        : <div></div>}
                    </Section>

                    {!quizGrades.length ?
                        <Headline margin='medium' size='small'>
                            No quizzes to show at this moment
                        </Headline>
                        :
                        <StudentQuizGradeAccordionList 
                            quizGrades={quizGrades}
                            participationData={participationData}
                            calculateQuizGrade={this.calculateQuizGrade}
                            colorIndex={this.colorIndex}
                        />          
                    }          
                </Article>
            </div>
        )
    }
}
export default StudentQuizGradesView;