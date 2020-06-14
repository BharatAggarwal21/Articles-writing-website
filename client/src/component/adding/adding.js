import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import "./adding.css";
export default class Add extends Component{
    state={
        title:'',
        content:'',
        added:false,
        authorised:true
    }
    componentDidMount(){
        this.mounted=true;
        const token=localStorage.getItem('token');
        if(!token)
        {
            if(this.mounted)
                this.setState({authorised:false});
        }
    }
    componentWillUnmount(){
        this.mounted=false;
    }
    handleChange=e=>{
        this.setState({ [e.target.name]:e.target.value });
    };
    handleSubmit=e=>{
        e.preventDefault();
        const config={
            state:this.state,
            headers:{}
        }
        const token=localStorage.getItem('token');
        if(token)
            config.headers['x-auth-token']=token;
        axios.post('api/items/add',config)
            .then(res=>{this.setState({added:true})})
            .catch(err=>alert("Please Login Again"));
    }
    render(){
        if(!this.state.authorised)
            return <Redirect to="/login"/>
        if(this.state.added)
            return <Redirect to="/listing"/>
        return(
            <div className="addingarticle">
                <form className="addingform" >
                <label className="addinput">Enter The Title</label>
                <br/>
                <input className="addingtext" onChange={this.handleChange} type="text" id="title" name="title" placeholder="Title Name..."/>
                <br/>
                <br/>
                <label className="addinput" for="content">Enter The Content</label>
                <br/>
                <textarea className="bodyadd" onChange={this.handleChange} type="text" id="content" name="content" placeholder="Your Content.."/>
                <br/>
                <input className="addingsubmit" onClick={this.handleSubmit} type="submit" value="Add"/>
            </form>

            </div>
        );
    }
};