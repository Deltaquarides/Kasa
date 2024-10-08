import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import listApartment from "../../utils/listApartment.json";
import { SlideShow } from "../../components/SlideShow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "../../components/Collapse";
import { Tags } from "../../components/Tags";
import { Cards } from "../../components/Cards";

const SlideShowSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-right: 20px;
  margin-left: 20px;
  justify-content: center;
  align-items: center;
`;
const DetailsApartmentSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 20px;
  @media screen and (min-width: 1054px) {
    display: flex;
    flex-direction: row;
  }
`;

const TagsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 20px;
  @media screen and (max-width: 319px) {
    flex-wrap: wrap;
  }
`;

const CardRatingContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (min-width: 1054px) {
    flex-direction: column-reverse;
  }
  @media screen and (min-width: 318px) {
    flex-wrap: unset;
  }
  @media screen and (width <317px) {
    flex-wrap: wrap;
  }
`;

const RatingWrapper = styled.div`
  display: flex;
  gap: clamp(0rem, 2vw, 1.2rem);
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media screen and (max-width: 320px) {
    right: 69px;
    top: 50px;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: grey;
  font-size: clamp(15px, 5vw, 25px);
  ${(props) =>
    props.$emptyStars &&
    `                       
       color: rgb(255, 114, 97);

      `}
`;

const CollapseSection = styled.section`
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 35px;
  display: flex;
  gap: 2rem;
  @media screen and (max-width: 480px) {
    flex-wrap: wrap;
  }
`;

// Méthode find, on compare l'id en params avec les id de la liste des appartements
//pour ciblé l'appartement lors du clique de l'utilisateur.
export const DetailsApartmentDisplay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectData, setSelectData] = useState(null);

  useEffect(() => {
    const specificApartment = listApartment.find((accomodation) => {
      return accomodation.id === id;
    });

    !specificApartment ? navigate("*") : setSelectData(specificApartment);
  }, [id, navigate]);

  // Les données ne seront pas disponibles au premier render, On gère donc le cas en renvoyant null
  // sinon message d'erreur: cannot read property of undefined.
  /*if (!selectData) {
    return null;
  }*/

  const gauges = [1, 2, 3, 4, 5];

  return (
    //Erreur: cannot read property of undefined.
    //Solution: on doit vérifier si selectData est définit avant d'accéder à ses propriétés. On utilise donc un opérateur
    //conditionnel pour render les éléments; titre, nom ... uniquement si selectData est définit.
    selectData && (
      <>
        <SlideShowSection>
          <SlideShow specificApartment={selectData} id={id} />
        </SlideShowSection>
        <DetailsApartmentSection>
          <div>
            <div>
              <h1 style={{ color: "rgb(255, 114, 97)", margin: "0px " }}>
                {selectData.title}
              </h1>
              <p style={{ color: "rgb(255, 114, 97)" }}>
                {selectData.location}
              </p>
            </div>

            <TagsWrapper>
              <Tags content={selectData.tags} />
            </TagsWrapper>
          </div>
          <CardRatingContainer>
            <RatingWrapper>
              {gauges.map((gauge, index) =>
                gauge >= selectData.rating ? (
                  <span key={index}>
                    {<StyledFontAwesomeIcon icon={faStar} />}
                  </span>
                ) : (
                  <span key={index}>
                    {" "}
                    {<StyledFontAwesomeIcon $emptyStars icon={faStar} />}
                  </span>
                )
              )}
            </RatingWrapper>
            <CardContainer>
              <Cards
                name={selectData.host.name}
                pic={selectData.host.picture}
              />
            </CardContainer>
          </CardRatingContainer>
        </DetailsApartmentSection>

        <CollapseSection>
          <Collapse title="Description" content={selectData.description} />
          <Collapse
            title="Equipements"
            content={selectData.equipments.map((spec, index) => (
              <ul key={index} style={{ listStyle: "none" }}>
                <li>{spec} </li>
              </ul>
            ))}
          />
        </CollapseSection>
      </>
    )
  );
};
