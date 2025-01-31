import { Flex } from "antd";
import { Ability } from "../../models/PokemonInfo";
import { AbilityTag, CardInfo } from "./styles";

export type CardPokemonAbilitiesProps = {
  abilities: Ability[];
};

const CardPokemonAbilities = ({ abilities }: CardPokemonAbilitiesProps) => {
  const renderTags = () =>
    abilities.map((item) => {
      const { name } = item.ability;

      return (
        <AbilityTag key={name} color="blue" bordered>
          {name}
        </AbilityTag>
      );
    });

  return (
    <CardInfo title="Abilities">
      <Flex vertical justify="space-around">
        <Flex vertical justify="center" gap={10}>
          {renderTags()}
        </Flex>
      </Flex>
    </CardInfo>
  );
};

export default CardPokemonAbilities;
