<template>
	<div>
		<object :width='w' :height='h' id='SampleMediaPlayback' name='SampleMediaPlayback' type='application/x-shockwave-flash' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' >
			<param name='movie' value='http://192.168.4.227:8022/swfs/SampleMediaPlayback.swf' /> 
			<param name='quality' value='high' /> 
			<param name='bgcolor' value='#000000' /> 
			<param name='allowfullscreen' value='true' /> 
			<param name="allowScriptAccess" value="always" />
			<param name="JcScpAutoPlay" value="yes" />
			<param name="autostart" value="1" />
			<param name='flashvars' :value="'&src='+url+'&autoHideControlBar=true&streamType=vod&verbose=true&autoPlay=true'"/>
			<embed src='http://192.168.4.227:8022/swfs/SampleMediaPlayback.swf'  :width='w' :height='h' id='SampleMediaPlayback' quality='high' bgcolor='#000000' name='SampleMediaPlayback' 
			allowfullscreen='true' pluginspage='http://www.adobe.com/go/getflashplayer'
			:flashvars="'&src='+url+'&autoHideControlBar=true&streamType=vod&verbose=true&autoPlay=true'" 
			type='application/x-shockwave-flash'> </embed>
		</object>	
	</div>
</template>

<script>
	export default{
		props:['url','w','h']
	}
</script>

<style>
</style>
