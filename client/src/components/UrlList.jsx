import React from 'react';
import Button from './Button';

const UrlList = ({ Link, buttonClickFunc, userId }) => {
	// console.log("urllist part data check -> ", buttonClickFunc);

	const clickFunc = (text) =>  {
		return buttonClickFunc(text, Link.id, userId);
	};

	return (
		<li key={Link.id}>
			<h4>{Link.title}</h4>
			<a href={Link.url}>{Link.url}</a>
			<span style={{color: "green"}}> {Link.tag} </span>
			<span>vote: {Link.vote} </span>
			<Button
				clickFunc={clickFunc}
				text={"vote"}
			/>
			<Button
				clickFunc={clickFunc}
				text={"edit"}
			/>
			<Button
				clickFunc={clickFunc}
				text={"delete"}
			/>
			<p>{Link.summary}</p>
			<hr/>
		</li>
	);
};

export default UrlList;
