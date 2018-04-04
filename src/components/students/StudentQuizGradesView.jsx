import React from 'react';
import StudentQuizGradeAccordionList from './StudentQuizGradeAccordionList.jsx';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';
import Button from "grommet/components/Button";


class StudentQuizGradesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        this.props.getQuizDataForStudentInClass({
            studentId: this.props.studentId,
            classId: this.props.targetClass.id
        })
    }

    render() {
        let className = this.props.targetClass.name;
        let classId = this.props.targetClass.id
        if (this.props.targetClass.quizGrades) {
            var quizData = this.props.targetClass.quizGrades
        } else {
            var quizData = [];
        }
        return (
            <div>
                <Article>
                    <Section pad='medium'
                        justify='center'
                        colorIndex='grey-4'
                        align='center'>
                        <Headline margin='medium' size='medium'>
                        {className}
                        </Headline>
                    </Section>

                    {!quizData.length ?
                        <Headline margin='medium' size='small'>
                            No quizzes to show at this moment
                        </Headline>
                        :
                    <StudentQuizGradeAccordionList 
                        quizData={quizData}
                    />          
                    }          
                </Article>
            </div>
        )
    }
}
export default StudentQuizGradesView;