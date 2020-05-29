export function getFontFamValue(fileName){
	let fontFamily = fileName.replace(/\.\w*/g, "");
	fontFamily = fontFamily.replace(/-/g, " ");
	fontFamily = fontFamily.replace(/([a-z])([A-Z])/g, function(match, p1, p2){
		return p1+' '+p2;
	});

	return fontFamily;
}

export function getFontFace(fontName, fileName, storageLink){
	return "@font-face{"+
			"font-family: '"+getFontFamValue(fileName)+"';"+
			"src: url('"+storageLink+fontName+"/"+fileName+"');"+
		"}";
}