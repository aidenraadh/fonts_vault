import React from 'react';
import x from './../test.js';

export default function LARAVEL_CSRF_TOKEN(){
	let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
	return (
		<>
		<input type="hidden" name="_token" value={token} />
		</>
	);
}