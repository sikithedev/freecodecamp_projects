#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"

echo -e "\n~~~~~ MY SALON ~~~~~\n"

MAIN_MENU() {
  if [[ $1 ]]
  then
    echo -e "$1 What would you like today?"
  else
    echo -e "Welcome to My Salon, how can I help you?\n"
  fi
  
  SERVICES=$($PSQL "SELECT service_id, name FROM services;");
  echo "$SERVICES" | while read SERVICE_ID BAR NAME
  do
    echo -e "$SERVICE_ID) $NAME"
  done

  read SERVICE_SELECTION

  if [[ ! $SERVICE_SELECTION =~ ^[0-9]+$ ]]
  then
    MAIN_MENU "\nThat is not a valid service number."
  else
    SERVICE=$($PSQL "SELECT * FROM services WHERE service_id = $SERVICE_SELECTION;")
    
    if [[ -z $SERVICE ]]
    then
      MAIN_MENU "\nI could not find that service."
    else 
      echo -e "\nWhat's your phone number?"
      read PHONE_NUMBER

      CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$PHONE_NUMBER';")
      if [[ -z $CUSTOMER_NAME ]]
      then
        echo -e "\nI don't have a record for that phone number, what's your name?"
        read CUSTOMER_NAME

        INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers (phone, name) VALUES('$PHONE_NUMBER', '$CUSTOMER_NAME');")
      fi

      CUSTOMER_ID=$($PSQL "")
      echo -e "\nWhat time would you like your $SERVICE, $CUSTOMER_NAME?"
    fi
  fi
}

MAIN_MENU