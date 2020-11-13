import React from 'react';
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import Demo from "../images/always-balanced-demo.mp4"


class About extends React.Component {

  state = {
    showDemo: false
  }

  handleToggleShowDemo = () => {
    this.setState({
      showDemo: !this.state.showDemo
    })

    
  }

  render() {
    return (

      <div className="home-div">
          <Link to='/' >
            <button className="buttons back-buttons">⬅</button>
          </Link>
          <img src={require("../images/background-bottom-left.png")} alt='' id="background-bottom-left" />
          <img src={require("../images/background-top-right.png")} alt='' id="background-top-right" />
          {this.state.showDemo === false ?
            <div className="centred-divs info-divs">
              <h2>Always Balanced</h2>
              <p>Always Balanced is designed to improve your work-life balance while working from home. By simply adding a few details about yourself, you can create a personalised schedule which reflects how you like to work as well as how you like to relax. In today's world, it is vital that you take the time to delineate between work life and personal life, and Always Balanced aims to help you do just that.</p>
              <p>When creating a schedule, you can add tasks from your pre-existing tasks list, make new tasks, and select the relaxation categories you're interested in. We'll then generate a schedule for you, inclusive of the tasks you want to tackle, short breaks, longer breaks with suggested relaxation activities, and time off for lunch. By following this plan, you'll have ample time for both work and relaxation, and hopefully experience a better work-life balance.</p>
              <button className="buttons" onClick={this.handleToggleShowDemo}>Demo</button>
            </div>
          :
            <div>
              <ReactPlayer className="react-player"
                playing
                controls={true}
                url={[
                  {src: Demo, type: 'video/mp4'},
                ]}
              />
              <button className="buttons" onClick={this.handleToggleShowDemo}>About</button>
            </div>
          }
      </div>
  
    );
  }

  
}

export default About;