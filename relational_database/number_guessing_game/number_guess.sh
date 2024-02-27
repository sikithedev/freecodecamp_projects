#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess --tuples-only -c"

echo "Enter your username:"
read USERNAME

PLAYER_ID=$($PSQL "SELECT player_id FROM players WHERE username='$USERNAME'")
if [[ -z $PLAYER_ID ]]
then
  PLAYER_INSERT_RESULT=$($PSQL "INSERT INTO players(username) VALUES('$USERNAME')")
  echo "Welcome, $USERNAME! It looks like this is your first time here."
else
  
  echo "Welcome back, $USERNAME! You have played <games_played> games, and your best game took <best_game> guesses."
fi

RANDOM_NUMBER=$((RANDOM % 1000 + 1))
echo "Guess the secret number between 1 and 1000:"