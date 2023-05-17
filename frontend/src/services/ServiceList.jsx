import React from 'react'
import ServiceCard from './ServiceCard'
import {Col} from 'reactstrap'

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData =[
  {
    imgUrl: weatherImg,
    title: "Dự báo thời tiết",
    desc: "Nắng mưa là chuyện của trời.",
  },
  {
    imgUrl: guideImg,
    title: "Hướng dẫn viên",
    desc: "Chuyên nghiệp, tận tâm với nghề.",
  },
  {
    imgUrl: customizationImg,
    title: "Tuỳ chọn",
    desc: "Đa dạng, phong phú.",
  }
]

const ServiceList = () => {
  return (
    <>
      {
        servicesData.map((item, index) =>(
          <Col lg='3' key={index}>
            <ServiceCard item={item}/>
          </Col>
        ))}
    </>
  )
}

export default ServiceList