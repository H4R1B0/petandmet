import React, { useState, useEffect } from 'react'
import { OpenVidu } from 'openvidu-browser'
import axios from 'axios'
import UserVideoComponent from './UserVideoComponent'
import { removeOvSession } from 'hooks/Live/useOvOut'
import { patchOvSession } from 'hooks/Live/useLivePatch'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { getLiveDetail } from 'hooks/Live/useLiveDetail'

const OPENVIDU_SERVER_URL = 'https://i9b302.p.ssafy.io/ov/openvidu'
const OPENVIDU_SERVER_SECRET = 'MY_SECRET'

const CreateOpenVidu = () => {
  const [myUserName, setMyUserName] = useState(
    'Participant' + Math.floor(Math.random() * 100)
  )
  const [session, setSession] = useState(undefined)
  const [mainStreamManager, setMainStreamManager] = useState(undefined)
  const [publisher, setPublisher] = useState(undefined)
  const [subscribers, setSubscribers] = useState([])
  const [isSubscriber, setIsSubscriber] = useState(false)
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined)
  const navigate = useNavigate()

  const { id } = useParams()
  const liveId = id
  const outLive = removeOvSession()
  const patchLive = patchOvSession()

  const { data, refetch } = getLiveDetail(liveId)

  // const info = location.state
  const [createSessionInfo, setCreateSessionInfo] = useState({
    id: liveId,
    center_uuid: '',
    session_name: '',
    session_id: '',
    center_item_id: [],
    animal_uuid: '',
  })

  useEffect(() => {
    if (data && data.response && data.response.status === 200) {
      console.log(data.response)
      setCreateSessionInfo(prevData => ({
        ...prevData,
        center_uuid: data.response.center.centerUuid,
        session_name: data.response.session_name,
        animal_uuid: data.response.animal.uuid,
      }))
    }
  }, [data])

  const deleteSubscriber = streamManager => {
    const updatedSubscribers = subscribers.filter(sub => sub !== streamManager)
    setSubscribers(updatedSubscribers)
  }

  useEffect(() => {
    if (createSessionInfo.session_id !== '') {
      console.log(createSessionInfo.session_id)
      patchLive.mutate(createSessionInfo)
    }
  }, [createSessionInfo.session_id])

  const handleSessionId = value => {
    setCreateSessionInfo(prevInfo => ({
      ...prevInfo,
      session_id: value,
    }))
  }
  const handleLiveId = value => {
    setCreateSessionInfo(prevInfo => ({
      ...prevInfo,
      id: value,
    }))
  }

  const joinSession = async () => {
    console.log('Joining session...')
    const OV = new OpenVidu()
    OV.enableProdMode()

    const mySession = OV.initSession()
    setSession(mySession)

    mySession.on('streamCreated', event => {
      const subscriber = mySession.subscribe(event.stream, undefined)
      setSubscribers(prevSubscribers => [...prevSubscribers, subscriber])
    })

    // streamDestroyed 이벤트 리스너 등록
    mySession.on('streamDestroyed', event => {
      console.log('세션 사라짐')
      deleteSubscriber(event.stream.streamManager)
    })

    // exception 이벤트 리스너 등록
    mySession.on('exception', exception => {
      console.warn(exception)
    })
    try {
      const token = await getToken() // getToken 함수 구현 필요
      console.log(token)
      await mySession.connect(token, { clientData: myUserName })

      if (!isSubscriber) {
        const publisher = await OV.initPublisherAsync(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: '640x480',
          frameRate: 30,
          insertMode: 'APPEND',
          mirror: false,
        })

        await mySession.publish(publisher)

        const devices = await OV.getDevices()
        const videoDevices = devices.filter(
          device => device.kind === 'videoinput'
        )
        const currentVideoDeviceId = publisher.stream
          .getMediaStream()
          .getVideoTracks()[0]
          .getSettings().deviceId
        const currentVideoDevice = videoDevices.find(
          device => device.deviceId === currentVideoDeviceId
        )

        setMainStreamManager(publisher)
        setPublisher(publisher)
        setCurrentVideoDevice(currentVideoDevice)
      }
    } catch (error) {
      console.log('세션 연결 오류:', error.code, error.message)
    }
  }
  useEffect(() => {
    if (createSessionInfo.animal_uuid !== '') {
      joinSession()
    }
  }, [createSessionInfo.animal_uuid])

  const leaveSession = async () => {
    if (session) {
      session.disconnect()
      outLive.mutate(liveId)
    }

    setSession(undefined)
    setSubscribers([])
    setMyUserName('Participant' + Math.floor(Math.random() * 100))
    setMainStreamManager(undefined)
    setPublisher(undefined)
    setIsSubscriber(false)
    navigate('/')
  }

  const getToken = async () => {
    let sessionIdTemp = createSessionInfo.session_id
    if (createSessionInfo.session_id === '') {
      sessionIdTemp = await createSession()
    }
    return await createToken(sessionIdTemp)
  }

  const createSession = async () => {
    console.log('Creating session...')
    try {
      const response = await axios.post(
        `${OPENVIDU_SERVER_URL}/api/sessions`,
        {},
        {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        }
      )
      handleSessionId(response.data.id)
      return response.data.id
    } catch (error) {
      console.error('Error creating session:', error)
      return ''
    }
  }
  const createToken = async sessionId => {
    try {
      const response = await axios.post(
        `${OPENVIDU_SERVER_URL}/api/sessions/${sessionId}/connection`,
        {},
        {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data.token
    } catch (error) {
      console.error('Error creating token:', error)
      return ''
    }
  }
  return (
    <div>
      {session !== undefined ? (
        <div id="session">
          <div
            id="session-header"
            className="flex flex-col justify-center px-[25%]"
          >
            <p className="text-4xl my-10">{createSessionInfo.session_name}</p>
            {mainStreamManager !== undefined ? (
              <div id="main-video" className="flex justify-center my-4">
                <UserVideoComponent streamManager={mainStreamManager} />
              </div>
            ) : (
              <div>Error</div>
            )}
            <div className="flex justify-end">
              <button
                className="py-2 px-4 rounded-xl bg-red-400 hover:bg-red-600"
                onClick={leaveSession}
              >
                방송 종료
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CreateOpenVidu
