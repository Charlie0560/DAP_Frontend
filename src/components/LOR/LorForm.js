import React,{Component} from 'react'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import FourthStep from './FourthStep'
// import Submit from './Submit'
import './lor.css'



export class LorForm extends Component{
  state={
    step:1,
    name: "",
    date: "",
    yearpassing: "",
    rollno: "",
    contact: "",
    email: "",
    parentemail: "",
    parentcontact: "",
    address: "",
    passportphoto: "",
    year: "",
    marks: "",
    percentage: "",
    year1: "",
    marks1: "",
    percentage1: "",
    year2: "",
    marks2: "",
    percentage2: "",
    year3: "",
    marks3: "",
    percentage3: "",
    
    exam: "",
    enrollno: "",
    score: "",
    result: "",
    faculty: "",
    program: "",
    university: "",
    branch: "",
    div: "",
    country: "",
  };
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const {
    date,
    yearpassing,
    rollno,
    year,
    marks,
    percentage,
    year1,
    marks1,
    percentage1,
    year2,
    marks2,
    percentage2,
    year3,
    marks3,
    percentage3,
    
    exam,
    enrollno,
    score,
    result,
    faculty,
    program,
    university,
    branch,
    div,
    country } = this.state;
    const values = { 
      date,
      yearpassing,
      rollno,
      year,
      marks,
      percentage,
      year1,
      marks1,
      percentage1,
      year2,
      marks2,
      percentage2,
      year3,
      marks3,
      percentage3,
      
      exam,
      enrollno,
      score,
      result,
      faculty,
      program,
      university,
      branch,
      div,
      country };
      console.log(values);
      const user = this.props.user;
        
    switch (step) {
      case 1:
        return (
          <FirstStep
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <SecondStep
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <ThirdStep
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}

            values={values}
          />
        );
      case 4:
        return <FourthStep 
        nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            user={user}
            values={values}
            />;
        //     case 4:
        // return <Submit />
      default:
        (console.log('This is a LOR form'))
      }
  }
}

export default LorForm