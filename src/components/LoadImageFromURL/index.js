/* eslint-disable react-hooks/exhaustive-deps, react/display-name, no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import ImageCropper from './ImageCropper';
import { Box, Button, Dialog, DialogActions, DialogContent, Modal, ModalBody, Stack } from "@mui/material";
import notFound from './../../images/notfound.png'

const MyLoadImageFromURL = (props) => {
  const [isCropperOpen, setIsCropperOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [finalImage, setFinalImage] = useState('');
  const [imageFound, setImageFound] = useState(true);

  const { id, handleupdate, name, thumbnail, imageid, imagename, showinitials } = props

  const GetPicture = () => {
    if (handleupdate){
      setIsCropperOpen(true);

    }
  }

  const onClose = () => {
    setIsCropperOpen(false);
  }


  function dataURLtoBlob(dataURL) {
    let array, binary, i, len;
    binary = atob(dataURL.split(',')[1]);
    array = [];
    i = 0;
    len = binary.length;
    while (i < len) {
      array.push(binary.charCodeAt(i));
      i++;
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/png'
    });
  };

  const handlecropperaccept = () => {
    console.log('Cropper Accept');
    const preview = document.getElementById(id);
    preview.hidden = false;
    preview.setAttribute("src", finalImage);

    setIsCropperOpen(false);
    setIsPreviewOpen(false);

    const canvas = document.createElement('canvas');
    canvas.setAttribute('src', finalImage)
    

    fetch(preview.src)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          let file = dataURLtoBlob(reader.result);

          if (handleupdate) {
            const myEvent = {
              target: {
                name: name,
                value: file,
              }
            };
            handleupdate(myEvent)
          }
        };
        reader.readAsDataURL(blob);
      });
  }



  const closeImageLoader = () => {
    setIsCropperOpen(false);
  }

  const handelOnImageError = (currentTarget) => {
    currentTarget.onerror = null;
    currentTarget.src = notFound;
  }

  const DisplayImage = () => {


    return (
      <Box display={'flex'} alignContent={'center'} justifyContent={'center'} >
        <img
          id={id}
          name={name}
          height={props.height}
          onChange={handleupdate}
          className={myClassName}
          onClick={GetPicture}
          src={finalImage}
          alt=""
          onError={({ currentTarget }) => {
            handelOnImageError(currentTarget)
          }}
        />
      </Box>
    )
  }

  const GetInitials = () => {
    let initials = '';
    imagename.split(' ').forEach((word) => { initials += word[0].toString().toUpperCase() })
    return (
      <div id='myInitials' hidden={false} classsName={myClassName} onClick={GetPicture}>{initials}</div>
    )
  }


  useEffect(() => {

    if (!imageid && !imagename) {
      setFinalImage(notFound)
    } else if (imageid && imageid.length > 0) {
      if (imageid === '1'){
        setFinalImage(notFound)

      }else{
        setFinalImage(myURL)

      }
    } else if (imagename && imagename.length > 0) {
      setFinalImage('');
      setImageFound(false);
      console.log("poner iniciales")
    }

  }, [])

  var myURL = thumbnail ? `/v1/utility/image?ID=${imageid}&thumb=true` : `/v1/utility/image?ID=${imageid}`
  var myClassName = thumbnail ? 'circle' : '';

  return (
    <>
      {imageid && imageid.length > 0 && (
        <DisplayImage />

      )}

      {showinitials && (
        <>

          <GetInitials />
          <img
            hidden
            id={id}
            name={name}
            height={props.height}
            onChange={handleupdate}
            className={myClassName}
            onClick={GetPicture}
            alt=""
          />
        </>

      )}
      <Dialog open={isCropperOpen} onClose={onClose} fullWidth>
        <DialogContent>
          <ImageCropper setFinalImage={(i) => setFinalImage(i)} setIsPreviewOpen={setIsPreviewOpen} closeImageLoader={closeImageLoader} aspectRatio={props.aspectRatio} />
        </DialogContent>
      </Dialog>

      <Dialog open={isPreviewOpen} onClick={() => setIsPreviewOpen(false)} size="lg" >
        <DialogContent>
          <img src={finalImage} alt='final' height='300px' />
        </DialogContent>
        <DialogActions>
          <Stack spacing={2} direction='row' justifyContent='end' paddingTop={3}>
            <Button onClick={() => setIsPreviewOpen(false)} variant='contained'>Cancelar</Button>
            <Button onClick={handlecropperaccept} variant='contained'>Aceptar</Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

const LoadImageFromURL = React.memo(MyLoadImageFromURL);

LoadImageFromURL.propTypes = {
  id: PropTypes.string.isRequired,
  handleupdate: PropTypes.func

}

export default LoadImageFromURL;