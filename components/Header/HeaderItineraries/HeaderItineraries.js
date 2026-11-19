import { HeaderItinerariesStyles } from './styles/HeaderItinerariesStyles'
import NoItineraries from './NoItineraries'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import React from 'react'
import DeleteItineraryModal from '../../Itinerary/Modal/DeleteItineraryModal'
import HeaderItineraryList from './HeaderItineraryList'
import autoId from '../../../lib/autoId'
import dayjs from 'dayjs'
import useLocalStorage from '../../../lib/useLocalStorage'
import {
  getFirestore,
  setDoc,
  updateDoc,
  doc,
  arrayUnion,
} from 'firebase/firestore/lite'
import { useDispatch } from 'react-redux'
import { setItineraries } from '../../../store/itinerarySlice'
import dynamic from 'next/dynamic'
import BasicModal from '../../UI/BasicModal'

const DragInfo = dynamic(() => import('../../UI/DragInfo'))

const HeaderItineraries = ({ t, setShowItineraries, itineraries, user }) => {
  const db = getFirestore()
  const dispatch = useDispatch()

  const [itineraryToDelete, setItineraryToDelete] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [itinerariesList, setItinerariesList] = useState(itineraries || [])

  const { getItem, setItem } = useLocalStorage()

  const newItinerary = async () => {
    const id = autoId()

    const generateName = () => {
      const baseName = t('newTourName', { number: itineraries.length + 1 || 1 })
      const exists = itineraries.some(
        (i) => i.name === baseName
      )
      return exists ? `${baseName} (2)` : baseName
    }

    const itinerary = {
      id,
      name: generateName(),
      date: dayjs().add(1, 'day').format('MM/DD/YYYY'),
      startTime: '08:00',
      attractions: [],
      description: '',
      person: 1,
      photos: [],
      travelModes: [],
      durations: [],
      createdBy: user?.uid || 'Guest',
      guide: null,
      published: false,
      status: false,
      lunch: -1,
    }

    const updateDb = async () => {
      try {
        await setDoc(doc(db, 'itineraries', id), itinerary)
        const updatedItineraries = [itinerary, ...itineraries]

        if (getItem('itineraries')) {
          const saved = JSON.parse(getItem('itineraries'))
          setItem('itineraries', JSON.stringify([id, ...saved]))
        } else {
          setItem('itineraries', JSON.stringify([id]))
        }

        if (user?.uid) {
          await updateDoc(doc(db, 'users', user.uid), {
            itineraries: arrayUnion(id),
          })
        }

        dispatch(setItineraries(updatedItineraries))
        return true
      } catch (err) {
        console.error('Error saving itinerary:', err)
        return false
      }
    }

    if (typeof navigator !== 'undefined' && navigator.cookieEnabled) {
      return updateDb()
    } else {
      const updatedItineraries = [itinerary, ...itineraries]
      dispatch(setItineraries(updatedItineraries))
      return true
    }
  }

  useEffect(() => {
    if (Array.isArray(itineraries)) {
      setItinerariesList(itineraries)
    }
  }, [itineraries])

  if (!itineraries)
    return (
      <Image src="/img/icon-spinner.svg" height={34} width={34} alt="spinner" />
    )

  return (
    <HeaderItinerariesStyles className="header-itineraries">
      <BasicModal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
        <DeleteItineraryModal
          t={t}
          setShowModal={setShowDeleteModal}
          itinerary={itineraryToDelete}
        />
      </BasicModal>

      <div className="itineraries">
        <button className="close-icon" onClick={() => setShowItineraries(false)}>
          <Image
            src="/img/icon-close.svg"
            height={20}
            width={20}
            alt="dekitabi-itineraries-close"
          />
        </button>

        <div className="itineraries-title flex-wrapper-five">
          <Image
            height={21}
            width={21}
            src="/img/icon-itinerary2.svg"
            alt="dekitabi-itineraries"
          />
          {t('itineraries')}
        </div>

        <div className="itineraries-wrapper">
          <div className="itinerary-create-wrapper">
            {!loading ? (
              <button
                className="itinerary-create flex-wrapper-five"
                onClick={() => {
                  setLoading(true)
                  newItinerary()
                    .then(() => setLoading(false))
                    .catch((err) => {
                      console.error(err)
                      setLoading(false)
                    })
                }}
              >
                <Image
                  height={12}
                  width={12}
                  src="/img/icon-plus.svg"
                  alt="dekitabi-add-itinerary-to-itineraries"
                />
                {t('itinerary')}
              </button>
            ) : (
              <div className="itinerary-create flex-wrapper-five create-loading">
                <Image
                  height={35}
                  width={35}
                  src="/img/icon-spinner.svg"
                  alt="dekitabi-itineraries-loading"
                />
              </div>
            )}
          </div>

          {!getItem('dragItineraryList') && itineraries.length > 1 && <DragInfo />}

          {itineraries.length > 0 ? (
            <div className="itinerary-list-wrapper">
              <HeaderItineraryList
                setShowItineraries={setShowItineraries}
                setShowDeleteModal={setShowDeleteModal}
                setItineraryToDelete={setItineraryToDelete}
                itinerariesList={itinerariesList}
                setItinerariesList={setItinerariesList}
              />
            </div>
          ) : (
            <NoItineraries t={t} />
          )}
        </div>
      </div>
    </HeaderItinerariesStyles>
  )
}
export default React.memo(HeaderItineraries)
