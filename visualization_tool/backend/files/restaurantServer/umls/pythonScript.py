from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.service import Service 
# from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

def generate_uml_png(uml_file_path):
    # Read the UML code from the file
    with open(uml_file_path, 'r') as uml_file:
        uml_code = uml_file.read()

    # Set up Selenium WebDriver (make sure you have the appropriate web driver executable in your PATH)
    driver = webdriver.Firefox()

    try:
        # Open the website
        driver.get('http://www.plantuml.com/plantuml/uml/')

        # Find the textarea and input the UML code
        textarea = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'textarea')))
        textarea.send_keys(uml_code)

        # Click the submit button
        submit_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//input[@value="Submit"]')))
        submit_button.click()

        # Wait for the umlpng link to appear
        umlpng_link = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//a[@title="umlpng"]')))

        # Get the URL of the PNG image
        png_url = umlpng_link.get_attribute('href')

        # Open the PNG URL
        driver.get(png_url)

        # Save the PNG image to a local file
        with open('output.png', 'wb') as output_file:
            output_file.write(driver.page_source.encode('utf-8'))

        print("PNG image saved as 'output.png'")
    except Exception as e:
        print("Error: ", e)
    finally:
        # Close the browser
        driver.quit()

# # Find the button by ID
# submit_button = driver.find_element(By.ID, 'submit_btn')

# # Click the button
# submit_button.click()

# # Close the browser
# driver.quit()
#         # Find the textarea and input the UML code
#         # textarea = soup.find('textarea')
#         # textarea['value'] = uml_code

        
# # Provide the path to your UML file
uml_file_path = 'refactoring2.puml'

generate_uml_png(uml_file_path)