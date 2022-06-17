cp.playbarAssetArr = 
[
	'AudioOff',
	'AudioOn',
	'BackGround',
	'Backward',
	'Color',
	'ColorSmall',
	'CC',
	'Exit',
	'FastForward',
	'FastForward1',
	'FastForward2',
	'Forward',
	'Glow',
	'GlowSmall',
	'Height',
	'Play',
	'Pause',
	'Progress',
	'Rewind',
	'Stroke',
	'StrokeSmall',
	'Thumb',
	'ThumbBase'
];
cp.specialHandlePlaybar = true;
cp.playbarTooltips = 
{
	AudioOff : 'Audio Off',
	AudioOn : 'Audio On',
	BackGround : 'BackGround',
	Backward : 'Backward',
	Color : 'Color',
	CC : 'CC',
	Exit : 'Exit',
	FastForward : '2x Fast Forward Speed',
	FastForward1 : '4x Fast Forward Speed',
	FastForward2 : 'Normal Speed',
	Forward : 'Forward',
	Glow : 'Glow',
	Height : 'Height',
	InnerStroke : 'InnerStroke',
	Play : 'Play',
	Pause : 'Pause',
	Progress : 'Progress',
	Rewind : 'Rewind',
	Shade : 'Shade',
	Stroke : 'Stroke',
	Thumb : 'Thumb',
	ThumbBase : 'ThumbBase'
};
cp.handleSpecialForPlaybar = function(playbarConstruct)
{
	if(playbarConstruct && playbarConstruct.secondRowArray && playbarConstruct.secondRowArray.length)
	{
		var arr = new Array();
		var i = 0;
		var hasSlider = false;
		for(i=0; i < playbarConstruct.secondRowArray.length; i++)
		{
			if(playbarConstruct.secondRowArray[i] == playbarConstruct.slider)
			{
				hasSlider = true;
				break;
			}
			else
				arr[arr.length] = playbarConstruct.secondRowArray[i];
		}
		var left = 8;
		for(i=0; i < arr.length; i++)
		{
			arr[i].currDiv.style.position = 'absolute';
			arr[i].currDiv.style.left = left + 'px';
			arr[i].currDiv.style.marginLeft = '';
			arr[i].currDiv.style.marginTop = '';
			arr[i].currDiv.style.top = '91.5px';
			left += 2 + arr[i].currDiv.width;
		}
		for(; i < playbarConstruct.secondRowArray.length; i++)
		{
			playbarConstruct.secondRowArray[i].currDiv.style.marginLeft = left +  'px';
			if(playbarConstruct.secondRowArray[i].thumbDiv)
				playbarConstruct.secondRowArray[i].thumbDiv.style.marginLeft = '5.322px';
		}
		i = playbarConstruct.secondRowArray.length - 1;
		if (playbarConstruct.secondRowArray[i] != playbarConstruct.slider && playbarConstruct.secondRowArray[i].iconName=='AudioOn')
		{
			playbarConstruct.secondRowArray[i].currDiv.style.position = 'absolute';
			playbarConstruct.secondRowArray[i].currDiv.style.left = '';
			playbarConstruct.secondRowArray[i].currDiv.style.right = 8 + 'px';
			playbarConstruct.secondRowArray[i].currDiv.style.top = '91.5px';
			playbarConstruct.secondRowArray[i].currDiv.style.marginLeft = '';
			playbarConstruct.secondRowArray[i].currDiv.style.marginTop = '';
		}
	}
}