import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Camera, MapPin, Send, RotateCcw, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface CameraCaptureProps {
  onBack: () => void;
}

export function CameraCapture({ onBack }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationName, setLocationName] = useState<string>('Getting location...');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setLocationName(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          setLocationError(false);
        },
        (error) => {
          console.log('Location permission denied or unavailable');
          // Use mock location for demo
          const mockLat = 19.0760 + Math.random() * 0.1;
          const mockLng = 72.8777 + Math.random() * 0.1;
          setLocation({ lat: mockLat, lng: mockLng });
          setLocationName(`Mumbai, Maharashtra`);
          setLocationError(true);
        }
      );
    } else {
      // Fallback for unsupported browsers
      const mockLat = 19.0760;
      const mockLng = 72.8777;
      setLocation({ lat: mockLat, lng: mockLng });
      setLocationName('Mumbai, Maharashtra');
      setLocationError(true);
    }

    // Start camera
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: 1280, height: 720 },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraError(false);
    } catch (error) {
      console.log('Camera permission denied or unavailable');
      setCameraError(true);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && !cameraError) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    if (!cameraError) {
      startCamera();
    }
  };

  const sendPhoto = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => {
        onBack();
      }, 2000);
    }, 2000);
  };

  if (isSent) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 bg-gradient-to-b from-[#F9F8FF] to-white">
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#6C63FF]/20 text-center">
          <div className="w-20 h-20 bg-[#EDEBFF] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-[#6C63FF]" />
          </div>
          <h2 className="text-[#2E2E3A] text-2xl font-semibold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Sent Successfully!
          </h2>
          <p className="text-[#2E2E3A]/60 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Your food donation photo with location has been shared
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#2E2E3A]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent pt-8 pb-6 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={onBack}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4 backdrop-blur-sm"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
            <h1 className="text-white text-xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              MAGIC HANDS
            </h1>
          </div>
        </div>

        {/* Location Badge */}
        {location && (
          <div className="mt-4 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 w-fit">
            <MapPin size={16} className="text-white" />
            <span className="text-white text-xs font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {locationName}
            </span>
            {locationError && (
              <span className="text-white/60 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                (demo)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Camera View or Captured Image */}
      <div className="flex-1 relative bg-black flex items-center justify-center">
        {!capturedImage ? (
          <>
            {!cameraError ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
              </>
            ) : (
              // Camera fallback UI
              <div className="w-full h-full bg-gradient-to-br from-[#6C63FF] to-[#5a52e6] flex flex-col items-center justify-center p-8">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center">
                  <Camera size={64} className="text-white mx-auto mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Camera Unavailable
                  </h3>
                  <p className="text-white/80 text-sm mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Please allow camera access or select a photo from your gallery
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white text-[#6C63FF] px-6 py-3 rounded-2xl font-medium flex items-center gap-2 mx-auto"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <ImageIcon size={20} />
                    Choose Photo
                  </button>
                </div>
              </div>
            )}
            
            {/* Camera Frame Overlay */}
            {!cameraError && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-8 border-2 border-white/30 rounded-3xl"></div>
              </div>
            )}
          </>
        ) : (
          <img
            src={capturedImage}
            alt="Captured"
            className="w-full h-full object-cover"
          />
        )}

        {/* Instructions */}
        {!capturedImage && !cameraError && (
          <div className="absolute bottom-24 left-0 right-0 text-center px-6">
            <p className="text-white text-sm font-medium bg-black/50 backdrop-blur-md rounded-full px-6 py-3 inline-block" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Capture your food donation
            </p>
          </div>
        )}
      </div>

      {/* Hidden file input for fallback */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Bottom Controls */}
      <div className="bg-gradient-to-t from-black/80 to-transparent p-6 pb-8">
        {!capturedImage ? (
          <div className="flex items-center justify-center gap-4">
            {cameraError ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-8 py-4 bg-[#6C63FF] text-white rounded-2xl shadow-lg shadow-[#6C63FF]/40 active:scale-95 transition-all"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <ImageIcon size={24} />
                <span className="font-medium">Select Photo</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-95 transition-all"
                >
                  <ImageIcon size={24} className="text-white" />
                </button>
                <button
                  onClick={capturePhoto}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg shadow-white/20 active:scale-95 transition-all"
                >
                  <Camera size={32} className="text-[#6C63FF]" />
                </button>
                <div className="w-14 h-14"></div>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-around gap-4">
            <button
              onClick={retakePhoto}
              disabled={isSending}
              className="flex flex-col items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl transition-all active:scale-95 disabled:opacity-50"
            >
              <RotateCcw size={28} className="text-white" />
              <span className="text-white text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Retake
              </span>
            </button>

            <button
              onClick={sendPhoto}
              disabled={isSending}
              className={`flex flex-col items-center gap-2 px-8 py-3 rounded-2xl transition-all active:scale-95 ${
                isSending 
                  ? 'bg-white/50 cursor-not-allowed' 
                  : 'bg-[#6C63FF] shadow-lg shadow-[#6C63FF]/40'
              }`}
            >
              {isSending ? (
                <>
                  <svg className="animate-spin h-7 w-7 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-white text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Sending...
                  </span>
                </>
              ) : (
                <>
                  <Send size={28} className="text-white" />
                  <span className="text-white text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Send
                  </span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Info Text */}
        {capturedImage && !isSending && (
          <p className="text-white/60 text-xs text-center mt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Photo will be sent with location: {locationName}
          </p>
        )}
        
        {!capturedImage && cameraError && (
          <p className="text-white/60 text-xs text-center mt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Camera access not available. You can still select photos from your device.
          </p>
        )}
      </div>
    </div>
  );
}