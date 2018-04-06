import SyntaxHighlighter from 'react-syntax-highlighter';
import syntaxStyle from 'react-syntax-highlighter/styles/hljs/github-gist.js';

export const code = function(text) {
  console.log('running')
  return text.split('~~~').map((text, i)=> {
    if (i % 2 === 0) {
      return text
    } else {
      // return (
      // <SyntaxHighlighter language='javascript' style={syntaxStyle} >
      //   {'\n' + text  + '\n'}
      // </SyntaxHighlighter>
      // )
       return <code
      	style={{
      		fontFamily: 'Monaco,Menlo,Consolas,"Courier New",monospace!important',
      		fontSize: '.75rem',
      		whiteSpace: 'normal',
      		color: '#7026d2',
      		padding: '2px 3px 1px',
      		tabSize: '4',
      		backgroundColor: '#f7f7f9',
      		border: '1px solid #e1e1e8',
      		borderRadius: '3px'
      	}}
      > 
        {'\n' + text + '\n'} 
      </code>
    }
  })
     
}

