import { Schema, model, Model } from 'mongoose';
import { IPokemon } from '../interfaces/pokemon.interface';

const PokemonSchema = new Schema<IPokemon>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { versionKey: false },
);

const PokemonModel: Model<IPokemon> = model('pokemons', PokemonSchema);
export default PokemonModel;
