import React from "react";
import styled from "styled-components";
import Image from "next/image";

type WeatherIconProps = {
  icon: string;
  description: string;
};

const WeatherBadgeStyled = styled.span`
  margin: auto 2px 0 2px;
  background-color: skyblue;
  border-radius: 18px;
`;

export default function WeatherIcon({ icon, description }: WeatherIconProps) {
  return (
    <WeatherBadgeStyled>
      <Image
        width={40}
        height={40}
        alt={description}
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
      />
    </WeatherBadgeStyled>
  );
}
