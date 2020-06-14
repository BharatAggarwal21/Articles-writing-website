import React, { Component } from 'react';
import axios from 'axios';
import './articlemanipulation.css';
import { Redirect } from 'react-router-dom';
export default class Manipulate extends Component{
    state={
        //id:this.props.match.params.id,
        title:'',
        author:'',
        content:'',
        saved:false,
        authorised:true
    }
    componentDidMount(){
        console.log(this.props);
        const token=localStorage.getItem('token');
        if(!token)
        {
            this.setState({authorised:false});
        }
        console.log("qqqq"+this.state.id);
        axios.get('api/items/edit/'+this.state.id)
            .then(res=>{this.setState({title:res.data.title});
                this.setState({author:res.data.author});
                this.setState({content:res.data.content});})
            .catch(err=>console.log(err));
    }
    handleChange=e=>{
        this.setState({ [e.target.name]:e.target.value });
    };
    handleSubmit=e=>{
        e.preventDefault();
        const config={
            headers:{},
            state:this.state
        }
        const token=localStorage.getItem('token');
        config.headers['x-auth-token']=token;
        axios.post('/api/items/edit/'+this.state.id,config)
        .then(res=>{console.log(res.data);this.setState({saved:true})})
        .catch(err=>{alert("error")});
    };
    handleDelete=e=>{
        e.preventDefault();
        const config={
            headers:{},
            state:this.state
        }
        const token=localStorage.getItem('token');
        config.headers['x-auth-token']=token;
        axios.delete('/api/items/edit/'+this.state.id,config)
        .then(res=>{console.log(res.data);this.setState({saved:true})})
        .catch(err=>{alert("Not Authorised")});
    }
    render(){
        if(!this.state.authorised)
            return <Redirect to="/login"/>
        if(this.state.saved)
            return <Redirect to="/listing"/>
        return(
            <div>
                <form className="formmanipulate">
                    <label for="title" >Title</label>
                    <br/>
                    <input className="textmanipulate" onChange={this.handleChange} type="text" id="title" name="title" placeholder={this.state.title}/>
                    <br/>
                    <label for="content" >Content</label>
                    <br/>
                    <textarea className="textmanipulate" onChange={this.handleChange} type="text" id="content" name="content" placeholder={this.state.content}/>
                    <br/>
                    <input onClick={this.handleSubmit} className="submitmanipulate" type="submit" value="Save Changes"/>
                    <input onClick={this.handleDelete} className="deletemanipulate" type="submit" value="Delete"/>
                </form>
            </div>
        );
    }
};