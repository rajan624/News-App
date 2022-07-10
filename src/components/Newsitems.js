import React, { Component } from 'react'

export class NewsItems extends Component {
  
  render() {


    let { title, description , imgUrl, newsUrl, author, date} = this.props;

    //default values
    const defaultUrl = "https://i.pinimg.com/originals/d1/a6/2a/d1a62a6d8969170025f279115470e34b.jpg"



    return (
     <div style={{background: "linear-gradient(to right, rgb(36, 198, 220), rgb(81, 74, 157))"}} className="card" >
      <img src={!imgUrl?defaultUrl:imgUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="text-muted my-2"> by <b>{!author?"unknown":author}</b> on {new Date(date).toGMTString()} </p>
        <a style={{backgroundcolor: "linear-gradient(to right, rgb(220, 36, 36), rgb(74, 86, 157))"}} href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read more</a>
        
      </div>
    </div>
    )

  }
}

export default NewsItems