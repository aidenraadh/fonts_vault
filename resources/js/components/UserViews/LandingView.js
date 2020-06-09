import React from 'react';
import {Button_3} from './../reusables/Buttons.js';

export default function LandingView(props){
	return (
		<>
		<article className="rows_container" style={{textAlign: 'center'}}>
			<img src={props.AppURLs.icons+'logo_2.png'} style={{
				display: 'block', width: '6rem', height: 'auto', margin: '0 auto 3rem',
			}}
			/>
			<h1 style={{fontWeight: '500', fontSize: '2.6rem', textAlign: 'center',}}>Fonts Vault</h1>
			<p style={{fontSize: '1.6rem', marginBottom: '4rem'}}>
				Store, test, and edit various fonts for your design purpose in a single app.			
			</p>
			<Button_3
				tagname = {'a'} color = {'blue'} text = {'VIEW APP'}
				attr = {{
					href: props.AppURLs.domain+'fonts',
					style: {display: 'block', width: '20rem', margin: '0 auto',
						fontSize: '1.6rem', marginBottom: '1rem'
					}
				}}
			/>
			<div className="cols_container center align_center" style={{marginBottom: '1rem'}}>
				<span style={{fontSize: '1.6rem', display: 'inline-block', margin: '0 2rem'}}>OR</span>
			</div>
			<Button_3
				tagname = {'a'} color = {'red'} text = {'Sign in'}
				attr = {{
					href: props.AppURLs.domain+'admin/login',
					style: {display: 'block', width: '20rem', margin: '0 auto',
						fontSize: '1.6rem',
					}
				}}
			/>			
		</article>
		</>//
	);
}