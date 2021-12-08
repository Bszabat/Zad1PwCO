# Zadanie1
punkt 3:         </br>
-
a. polecenie do zbudowania opracowanego obrazu kontenera *docker build -t [nazwa_obrazu] .*          
b) polecenie do uruchomienia kontenera na podstawie zbudowanego obrazu *docker run -p 5000:8080 -d [nazwa_obrazu]* 
c) polecenie do sposobu uzyskania informacji, które wygenerował serwer w trakcie uruchamiana kontenera *docker logs [nazwa_kontenera]*            
d) polecenie do sprawdzenia, ile warstw posiada zbudowany obraz *docker history [nazwa_obrazu]*             

punkt 4:         </br>
-
1. Można zbudować obraz wykorzystując bezpośrednio link do Dockerfile z GitHub-em wykorzystując polecenie: </br>
- *docker build [url repo na githubie]*
</br>
</br>

# Część dodatkowa

1.
a) Uruchomienie konteneru z regisrty odbywa się za pomocą polecenia: 
```docker run -d -p 6677:6677 --restart-always --name registry registry:2``` 

b) 
Pobranie najnowszej wersji ubuntu:                   
```docker pull ubuntu```                              
Zmiana nazwy:                                        
```docker tag ubuntu localhost:6677/newubnutu```     
Wgranie do utworzonego rejestru:         
```docker push localhost:6677/newubuntu```            


2.
Krok 1: Utworzenie folderu z certyfikatami: ```mkdir -p certificates```  
Krok 2: Do utworzonego folderu wklejenie pliki domain.crt oraz domain.key z urzędu certyfikacji      
Krok 3: Utworzenie folderu, gdzie znajduje się plik z hasłem poleceniem: ```mkdir auth```           
Krok 4: Utworzenie pliku z hasłem poleceniem: </br>
```docker run --entrypoint htpasswd httpd:2 -Bbn user password > auth/htpasswd``` 
Krok 5: Zatrzymanie registry poleceniem: ```docker container stop registry```             
Krok 6: Uruchomienie registry z podstawowym uwierzytelnianiem poleceniem:                   

  docker run -d \
  -p 5000:5000 \
  --restart=always \
  --name registry \
  -v "$(pwd)"/auth:/auth \
  -e "REGISTRY_AUTH=htpasswd" \
  -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
  -e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd \
  -v "$(pwd)"/certs:/certs \
  -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \
  -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \
  registry:2 

