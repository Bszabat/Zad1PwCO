# Zadanie1
Odpowiedzi na pytania z podpunktu nr 3:         </br>
-
a. polecenie do zbudowania opracowanego obrazu kontenera *docker build -t [nazwa_obrazu] .*           </br>
b) polecenie do uruchomienia kontenera na podstawie zbudowanego obrazu *docker run -p 5000:8080 -d [nazwa_obrazu]*  </br>
c) polecenie do sposobu uzyskania informacji, które wygenerował serwer w trakcie uruchamiana kontenera *docker logs [nazwa_kontenera]*              </br>
d) polecenie do sprawdzenia, ile warstw posiada zbudowany obraz *docker history [nazwa_obrazu]*              </br>

Odpowiedzi na pytania z podpunktu nr 4:         </br>
-
1. Można zbudować obraz wykorzystując bezpośrednio link do Dockerfile z GitHub-em wykorzystując polecenie: </br>
- *docker build [url repo na githubie]*
</br>
</br>

# Część dodatkowa

1.
a) Uruchomienie konteneru z regisrty odbywa się za pomocą polecenia: </br>
```docker run -d -p 6677:6677 --restart-always --name registry registry:2``` </br>
</br>
b) 
Pobranie najnowszej wersji ubuntu:                    </br>
```docker pull ubuntu```                              </br>
Zmiana nazwy:                                         </br>
```docker tag ubnutu localhost:6677/newubnutu```      </br>
Wgranie do utworzonego, prywatnego rejestru:          </br>
```docker push localhost:6677/newubuntu```            </br>


2.
Krok 1: Utworzenie folderu, w którym będą znajdować się certyfikaty poleceniem: ```mkdir -p certs```  </br>
Krok 2: Do utworzonego folderu wklejenie pliki domain.crt oraz domain.key z urzędu certyfikacji       </br>
Krok 3: Utworzenie folderu, gdzie znajduje się plik z hasłem poleceniem: ```mkdir auth```             </br>
Krok 4: Utworzenie pliku z hasłem poleceniem: </br>
```docker run --entrypoint htpasswd httpd:2 -Bbn testuser testpassword > auth/htpasswd``` </br>
Krok 5: Zatrzymanie registry poleceniem: ```docker container stop registry```             </br>
Krok 6: Uruchomienie registry z podstawowym uwierzytelnianiem poleciem:                   </br>
```bash
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
  registry:2 ```

