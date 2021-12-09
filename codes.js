module.exports = {
    answers: [
        `#include <stdio.h>
        #include <string.h>
        #include <math.h>
        #include <stdlib.h>
        
        int solveMeFirst(int a, int b) {
            // Hint: Type return a+b; below
            int c;
            return (c=a+b);
        }
        
        int main() {
            int num1,num2;
            scanf("%d %d",&num1,&num2);
            int sum; 
            sum = solveMeFirst(num1,num2);
            printf("%d",sum);
            return 0;
        }`,

        `#include <assert.h>
        #include <limits.h>
        #include <math.h>
        #include <stdbool.h>
        #include <stdio.h>
        #include <stdlib.h>
        #include <string.h>
        
        char* readline();
        char** split_string(char*);
        
        /*
         * Complete the simpleArraySum function below.
         */
        int simpleArraySum(int ar_count, int* ar) {
            /*
             * Write your code here.
             */
            int sum=0,i;
            for(i=0;i<ar_count;i++)
            sum = sum + *(ar+i);
            return sum;
        }
        
        int main()
        {
            FILE* fptr = fopen(getenv("OUTPUT_PATH"), "w");
        
            char* ar_count_endptr;
            char* ar_count_str = readline();
            int ar_count = strtol(ar_count_str, &ar_count_endptr, 10);
        
            if (ar_count_endptr == ar_count_str || *ar_count_endptr != '\0') { exit(EXIT_FAILURE); }
        
            char** ar_temp = split_string(readline());
        
            int ar[ar_count];
        
            for (int ar_itr = 0; ar_itr < ar_count; ar_itr++) {
                char* ar_item_endptr;
                char* ar_item_str = ar_temp[ar_itr];
                int ar_item = strtol(ar_item_str, &ar_item_endptr, 10);
        
                if (ar_item_endptr == ar_item_str || *ar_item_endptr != '\0') { exit(EXIT_FAILURE); }
        
                ar[ar_itr] = ar_item;
            }
        
            int result = simpleArraySum(ar_count, ar);
        
            fprintf(fptr, "%d\n", result);
        
            fclose(fptr);
        
            return 0;
        }
        
        char* readline() {
            size_t alloc_length = 1024;
            size_t data_length = 0;
            char* data = malloc(alloc_length);
        
            while (true) {
                char* cursor = data + data_length;
                char* line = fgets(cursor, alloc_length - data_length, stdin);
        
                if (!line) { break; }
        
                data_length += strlen(cursor);
        
                if (data_length < alloc_length - 1 || data[data_length - 1] == '\n') { break; }
        
                size_t new_length = alloc_length << 1;
                data = realloc(data, new_length);
        
                if (!data) { break; }
        
                alloc_length = new_length;
            }
        
            if (data[data_length - 1] == '\n') {
                data[data_length - 1] = '\0';
            }
        
            data = realloc(data, data_length);
        
            return data;
        }
        
        char** split_string(char* str) {
            char** splits = NULL;
            char* token = strtok(str, " ");
        
            int spaces = 0;
        
            while (token) {
                splits = realloc(splits, sizeof(char*) * ++spaces);
                if (!splits) {
                    return splits;
                }
        
                splits[spaces - 1] = token;
        
                token = strtok(NULL, " ");
            }
        
            return splits;
        }`,
        `#include <assert.h>
        #include <ctype.h>
        #include <limits.h>
        #include <math.h>
        #include <stdbool.h>
        #include <stddef.h>
        #include <stdint.h>
        #include <stdio.h>
        #include <stdlib.h>
        #include <string.h>
        
        char* readline();
        char* ltrim(char*);
        char* rtrim(char*);
        char** split_string(char*);
        
        // Complete the compareTriplets function below.
        
        /*
         * To return the integer array from the function, you should:
         *     - Store the size of the array to be returned in the result_count variable
         *     - Allocate the array statically or dynamically
         *
         * For example,
         * int* return_integer_array_using_static_allocation(int* result_count) {
         *     *result_count = 5;
         *
         *     static int a[5] = {1, 2, 3, 4, 5};
         *
         *     return a;
         * }
         *
         * int* return_integer_array_using_dynamic_allocation(int* result_count) {
         *     *result_count = 5;
         *
         *     int *a = malloc(5 * sizeof(int));
         *
         *     for (int i = 0; i < 5; i++) {
         *         *(a + i) = i + 1;
         *     }
         *
         *     return a;
         * }
         *
         */
        int* compareTriplets(int a_count, int* a, int b_count, int* b, int* result_count) {
        int l=0,m=0,i,*p;
        p = (int*)calloc(5,sizeof(int));
        for(i=0;i<3;i++)
        {
            if(*(a+i)>*(b+i))
            l++;
            if(*(a+i)<*(b+i))
            m++;
        }
        *result_count = 2;
        *(p+0) = l;
        *(p+1) = m;
        return p;
        }
        
        int main()
        {
            FILE* fptr = fopen(getenv("OUTPUT_PATH"), "w");
        
            char** a_temp = split_string(rtrim(readline()));
        
            int* a = malloc(3 * sizeof(int));
        
            for (int i = 0; i < 3; i++) {
                char* a_item_endptr;
                char* a_item_str = *(a_temp + i);
                int a_item = strtol(a_item_str, &a_item_endptr, 10);
        
                if (a_item_endptr == a_item_str || *a_item_endptr != '\0') { exit(EXIT_FAILURE); }
        
                *(a + i) = a_item;
            }
        
            int a_count = 3;
        
            char** b_temp = split_string(rtrim(readline()));
        
            int* b = malloc(3 * sizeof(int));
        
            for (int i = 0; i < 3; i++) {
                char* b_item_endptr;
                char* b_item_str = *(b_temp + i);
                int b_item = strtol(b_item_str, &b_item_endptr, 10);
        
                if (b_item_endptr == b_item_str || *b_item_endptr != '\0') { exit(EXIT_FAILURE); }
        
                *(b + i) = b_item;
            }
        
            int b_count = 3;
        
            int result_count;
            int* result = compareTriplets(a_count, a, b_count, b, &result_count);
        
            for (int i = 0; i < result_count; i++) {
                fprintf(fptr, "%d", *(result + i));
        
                if (i != result_count - 1) {
                    fprintf(fptr, " ");
                }
            }
        
            fprintf(fptr, "\n");
        
            fclose(fptr);
        
            return 0;
        }
        
        char* readline() {
            size_t alloc_length = 1024;
            size_t data_length = 0;
            char* data = malloc(alloc_length);
        
            while (true) {
                char* cursor = data + data_length;
                char* line = fgets(cursor, alloc_length - data_length, stdin);
        
                if (!line) {
                    break;
                }
        
                data_length += strlen(cursor);
        
                if (data_length < alloc_length - 1 || data[data_length - 1] == '\n') {
                    break;
                }
        
                alloc_length <<= 1;
        
                data = realloc(data, alloc_length);
        
                if (!data) {
                    data = '\0';
        
                    break;
                }
            }
        
            if (data[data_length - 1] == '\n') {
                data[data_length - 1] = '\0';
        
                data = realloc(data, data_length);
        
                if (!data) {
                    data = '\0';
                }
            } else {
                data = realloc(data, data_length + 1);
        
                if (!data) {
                    data = '\0';
                } else {
                    data[data_length] = '\0';
                }
            }
        
            return data;
        }
        
        char* ltrim(char* str) {
            if (!str) {
                return '\0';
            }
        
            if (!*str) {
                return str;
            }
        
            while (*str != '\0' && isspace(*str)) {
                str++;
            }
        
            return str;
        }
        
        char* rtrim(char* str) {
            if (!str) {
                return '\0';
            }
        
            if (!*str) {
                return str;
            }
        
            char* end = str + strlen(str) - 1;
        
            while (end >= str && isspace(*end)) {
                end--;
            }
        
            *(end + 1) = '\0';
        
            return str;
        }
        
        char** split_string(char* str) {
            char** splits = NULL;
            char* token = strtok(str, " ");
        
            int spaces = 0;
        
            while (token) {
                splits = realloc(splits, sizeof(char*) * ++spaces);
        
                if (!splits) {
                    return splits;
                }
        
                splits[spaces - 1] = token;
        
                token = strtok(NULL, " ");
            }
        
            return splits;
        }`,
        `#include <assert.h>
        #include <limits.h>
        #include <math.h>
        #include <stdbool.h>
        #include <stddef.h>
        #include <stdint.h>
        #include <stdio.h>
        #include <stdlib.h>
        #include <string.h>
        
        char* readline();
        char** split_string(char*);
        
        // Complete the aVeryBigSum function below.
        long aVeryBigSum(int ar_count, long* ar) {
        long int sum=0;
        int i;
        for(i=0;i<ar_count;i++)
        sum = sum + *(ar+i);
        return sum;
        }
        
        int main()
        {
            FILE* fptr = fopen(getenv("OUTPUT_PATH"), "w");
        
            char* ar_count_endptr;
            char* ar_count_str = readline();
            int ar_count = strtol(ar_count_str, &ar_count_endptr, 10);
        
            if (ar_count_endptr == ar_count_str || *ar_count_endptr != '\0') { exit(EXIT_FAILURE); }
        
            char** ar_temp = split_string(readline());
        
            long* ar = malloc(ar_count * sizeof(long));
        
            for (int i = 0; i < ar_count; i++) {
                char* ar_item_endptr;
                char* ar_item_str = *(ar_temp + i);
                long ar_item = strtol(ar_item_str, &ar_item_endptr, 10);
        
                if (ar_item_endptr == ar_item_str || *ar_item_endptr != '\0') { exit(EXIT_FAILURE); }
        
                *(ar + i) = ar_item;
            }
        
            long result = aVeryBigSum(ar_count, ar);
        
            fprintf(fptr, "%ld\n", result);
        
            fclose(fptr);
        
            return 0;
        }
        
        char* readline() {
            size_t alloc_length = 1024;
            size_t data_length = 0;
            char* data = malloc(alloc_length);
        
            while (true) {
                char* cursor = data + data_length;
                char* line = fgets(cursor, alloc_length - data_length, stdin);
        
                if (!line) { break; }
        
                data_length += strlen(cursor);
        
                if (data_length < alloc_length - 1 || data[data_length - 1] == '\n') { break; }
        
                size_t new_length = alloc_length << 1;
                data = realloc(data, new_length);
        
                if (!data) { break; }
        
                alloc_length = new_length;
            }
        
            if (data[data_length - 1] == '\n') {
                data[data_length - 1] = '\0';
            }
        
            data = realloc(data, data_length);
        
            return data;
        }
        
        char** split_string(char* str) {
            char** splits = NULL;
            char* token = strtok(str, " ");
        
            int spaces = 0;
        
            while (token) {
                splits = realloc(splits, sizeof(char*) * ++spaces);
                if (!splits) {
                    return splits;
                }
        
                splits[spaces - 1] = token;
        
                token = strtok(NULL, " ");
            }
        
            return splits;
        }`,
        `#include <assert.h>
        #include <ctype.h>
        #include <limits.h>
        #include <math.h>
        #include <stdbool.h>
        #include <stddef.h>
        #include <stdint.h>
        #include <stdio.h>
        #include <stdlib.h>
        #include <string.h>
        
        char* readline();
        char* ltrim(char*);
        char* rtrim(char*);
        char** split_string(char*);
        
        int parse_int(char*);
        
        /*
         * Complete the 'diagonalDifference' function below.
         *
         * The function is expected to return an INTEGER.
         * The function accepts 2D_INTEGER_ARRAY arr as parameter.
         */
        
        int diagonalDifference(int arr_rows, int arr_columns, int** arr) {
        int i,j,d1=0,d2=0,d;
        for(i=0;i<arr_rows;i++)
        {
          for(j=0;j<arr_columns;j++)
             {
                 if(i==j)
                   d1 = d1 + *(*(arr+i)+j);
                 if(j==(arr_rows-1)-i)
                   d2 = d2 + *(*(arr+i)+j);
             }
        }
             if((d1-d2)<0)
             d = d2 - d1;
             else 
             d = d1 - d2;
             return d;
        }
        
        int main()
        {
            FILE* fptr = fopen(getenv("OUTPUT_PATH"), "w");
        
            int n = parse_int(ltrim(rtrim(readline())));
        
            int** arr = malloc(n * sizeof(int*));
        
            for (int i = 0; i < n; i++) {
                *(arr + i) = malloc(n * (sizeof(int)));
        
                char** arr_item_temp = split_string(rtrim(readline()));
        
                for (int j = 0; j < n; j++) {
                    int arr_item = parse_int(*(arr_item_temp + j));
        
                    *(*(arr + i) + j) = arr_item;
                }
            }
        
            int result = diagonalDifference(n, n, arr);
        
            fprintf(fptr, "%d\n", result);
        
            fclose(fptr);
        
            return 0;
        }
        
        char* readline() {
            size_t alloc_length = 1024;
            size_t data_length = 0;
        
            char* data = malloc(alloc_length);
        
            while (true) {
                char* cursor = data + data_length;
                char* line = fgets(cursor, alloc_length - data_length, stdin);
        
                if (!line) {
                    break;
                }
        
                data_length += strlen(cursor);
        
                if (data_length < alloc_length - 1 || data[data_length - 1] == '\n') {
                    break;
                }
        
                alloc_length <<= 1;
        
                data = realloc(data, alloc_length);
        
                if (!data) {
                    data = '\0';
        
                    break;
                }
            }
        
            if (data[data_length - 1] == '\n') {
                data[data_length - 1] = '\0';
        
                data = realloc(data, data_length);
        
                if (!data) {
                    data = '\0';
                }
            } else {
                data = realloc(data, data_length + 1);
        
                if (!data) {
                    data = '\0';
                } else {
                    data[data_length] = '\0';
                }
            }
        
            return data;
        }
        
        char* ltrim(char* str) {
            if (!str) {
                return '\0';
            }
        
            if (!*str) {
                return str;
            }
        
            while (*str != '\0' && isspace(*str)) {
                str++;
            }
        
            return str;
        }
        
        char* rtrim(char* str) {
            if (!str) {
                return '\0';
            }
        
            if (!*str) {
                return str;
            }
        
            char* end = str + strlen(str) - 1;
        
            while (end >= str && isspace(*end)) {
                end--;
            }
        
            *(end + 1) = '\0';
        
            return str;
        }
        
        char** split_string(char* str) {
            char** splits = NULL;
            char* token = strtok(str, " ");
        
            int spaces = 0;
        
            while (token) {
                splits = realloc(splits, sizeof(char*) * ++spaces);
        
                if (!splits) {
                    return splits;
                }
        
                splits[spaces - 1] = token;
        
                token = strtok(NULL, " ");
            }
        
            return splits;
        }
        
        int parse_int(char* str) {
            char* endptr;
            int value = strtol(str, &endptr, 10);
        
            if (endptr == str || *endptr != '\0') {
                exit(EXIT_FAILURE);
            }
        
            return value;
        }`,
        `#include <assert.h>
        #include <limits.h>
        #include <math.h>
        #include <stdbool.h>
        #include <stddef.h>
        #include <stdint.h>
        #include <stdio.h>
        #include <stdlib.h>
        #include <string.h>
        
        char* readline();
        char** split_string(char*);
        
        // Complete the plusMinus function below.
        void plusMinus(int arr_count, int* arr) {
        float p=0,n=0,z=0;
        int i;
        for(i=0;i<arr_count;i++)
        {
         if(*(arr+i)>0)
         p++;
         else if(*(arr+i)<0)
         n++;
         else if(*(arr+i)==0)
         z++;
        }
        printf("%f\n",p/arr_count);
        printf("%f\n",n/arr_count);
        printf("%f",z/arr_count);
        }
        
        int main()
        {
            char* n_endptr;
            char* n_str = readline();
            int n = strtol(n_str, &n_endptr, 10);
        
            if (n_endptr == n_str || *n_endptr != '\0') { exit(EXIT_FAILURE); }
        
            char** arr_temp = split_string(readline());
        
            int* arr = malloc(n * sizeof(int));
        
            for (int i = 0; i < n; i++) {
                char* arr_item_endptr;
                char* arr_item_str = *(arr_temp + i);
                int arr_item = strtol(arr_item_str, &arr_item_endptr, 10);
        
                if (arr_item_endptr == arr_item_str || *arr_item_endptr != '\0') { exit(EXIT_FAILURE); }
        
                *(arr + i) = arr_item;
            }
        
            int arr_count = n;
        
            plusMinus(arr_count, arr);
        
            return 0;
        }
        
        char* readline() {
            size_t alloc_length = 1024;
            size_t data_length = 0;
            char* data = malloc(alloc_length);
        
            while (true) {
                char* cursor = data + data_length;
                char* line = fgets(cursor, alloc_length - data_length, stdin);
        
                if (!line) { break; }
        
                data_length += strlen(cursor);
        
                if (data_length < alloc_length - 1 || data[data_length - 1] == '\n') { break; }
        
                size_t new_length = alloc_length << 1;
                data = realloc(data, new_length);
        
                if (!data) { break; }
        
                alloc_length = new_length;
            }
        
            if (data[data_length - 1] == '\n') {
                data[data_length - 1] = '\0';
            }
        
            data = realloc(data, data_length);
        
            return data;
        }
        
        char** split_string(char* str) {
            char** splits = NULL;
            char* token = strtok(str, " ");
        
            int spaces = 0;
        
            while (token) {
                splits = realloc(splits, sizeof(char*) * ++spaces);
                if (!splits) {
                    return splits;
                }
        
                splits[spaces - 1] = token;
        
                token = strtok(NULL, " ");
            }
        
            return splits;
        }`,
        `#include <assert.h>
        #include <limits.h>
        #include <math.h>
        #include <stdbool.h>
        #include <stddef.h>
        #include <stdint.h>
        #include <stdio.h>
        #include <stdlib.h>
        #include <string.h>
        
        char* readline();
        
        // Complete the staircase function below.
        void staircase(int n) {
        int i,j;
        for(i=0;i<n;i++)
        {
            for(j=0;j<n;j++)
            {
                if(j>=(n-1)-i&&j<=(n-1))
                printf("#");
                else
                printf(" ");
            }printf("\n");
        }
        
        }
        
        int main()
        {
            char* n_endptr;
            char* n_str = readline();
            int n = strtol(n_str, &n_endptr, 10);
        
            if (n_endptr == n_str || *n_endptr != '\0') { exit(EXIT_FAILURE); }
        
            staircase(n);
        
            return 0;
        }
        
        char* readline() {
            size_t alloc_length = 1024;
            size_t data_length = 0;
            char* data = malloc(alloc_length);
        
            while (true) {
                char* cursor = data + data_length;
                char* line = fgets(cursor, alloc_length - data_length, stdin);
        
                if (!line) { break; }
        
                data_length += strlen(cursor);
        
                if (data_length < alloc_length - 1 || data[data_length - 1] == '\n') { break; }
        
                size_t new_length = alloc_length << 1;
                data = realloc(data, new_length);
        
                if (!data) { break; }
        
                alloc_length = new_length;
            }
        
            if (data[data_length - 1] == '\n') {
                data[data_length - 1] = '\0';
            }
        
            data = realloc(data, data_length);
        
            return data;
        }`
    ]
}